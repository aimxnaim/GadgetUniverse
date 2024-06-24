const catchAsyncErrors = require('../middlewares/catchAsyncError');
const Stripe = require('stripe');
const Order = require('../models/order');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// Create stripe checkout session => /api/v1/payment/checkout_sessions
module.exports.stripeCheckoutSession = catchAsyncErrors(
    async (req, res, next) => {

        const body = req?.body
        const line_items = body?.orderItems?.map(item => {
            return {
                price_data: {
                    currency: 'myr',
                    product_data: {
                        name: item?.name,
                        images: [item?.image],
                        metadata: { productId: item?.product }
                    },
                    unit_amount: item?.price * 100,
                },
                tax_rates: ["txr_1PV7p8L70pSBYwUSKbWrwwjX"],
                quantity: item?.quantity,
            }
        });

        const shipping_info = body?.shippingInfo
        const shipping_rate =
            body?.itemsPrice >= 200
                ? 'shr_1PV7cML70pSBYwUSQHmNeoQH'
                : 'shr_1PV7cvL70pSBYwUSifvLxfNM'

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.FRONTEND_URL}/me/orders`,
            cancel_url: `${process.env.FRONTEND_URL}`,
            customer_email: req?.user?.email,
            client_reference_id: req?.user?._id?.toString(),
            mode: 'payment',
            metadata: {
                ...shipping_info,
                itemsPrice: body?.itemsPrice,
            },
            shipping_options: [{
                shipping_rate,
            }],
            line_items,
        });

        res.status(200).json({
            success: true,
            url: session.url
        })
    })

// Get order items after payment
const getOrderItems = async (line_items) => {
    return new Promise((resolve, reject) => {
        let cartItems = []
        line_items?.data?.forEach(async (item) => {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            console.log('=====================================');
            console.log('Item => ', item);
            console.log('=====================================');
            console.log('Product => ', product);

            cartItems.push({
                product: productId,
                name: product.name,
                image: product.images[0],
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity
            });

            // Check if all items have been added to the cart
            if (cartItems.length === line_items?.data?.length) {
                resolve(cartItems)
            }
        })
    })
}

// Create new order after payment => /api/v1/payment/webhook
module.exports.stripeWebhook = catchAsyncErrors(
    async (req, res, next) => {
        console.log('Stripe Webhook Called');
        try {
            const signature = req.headers["stripe-signature"];
            const event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            console.log('Event Type => ', event.type);
            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;

                const line_items = await stripe.checkout.sessions.listLineItems(
                    session.id
                )

                const orderItems = await getOrderItems(line_items);
                const user = session.client_reference_id;

                const totalPrice = session.amount_total / 100;
                const taxPrice = session.total_details.amount_tax / 100;
                const shippingPrice = session.total_details.amount_shipping / 100;
                const itemsPrice = session.metadata.itemsPrice;

                const shippingInfo = {
                    address: session.metadata.address,
                    city: session.metadata.city,
                    phoneNo: session.metadata.phoneNo,
                    zipCode: session.metadata.zipCode,
                    country: session.metadata.country
                }

                const paymentInfo = {
                    id: session.payment_intent,
                    status: session.payment_status
                }

                const orderData = {
                    user,
                    orderItems,
                    shippingInfo,
                    paymentInfo,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                    paymentMethod: 'Card',
                };

                await Order.create(orderData);

            }

            res.status(200).json({
                success: true
            })

        } catch (error) {
            console.log('=======================================================================');
            console.log('error => ', error);
            console.log('=======================================================================');
        }
    })