const catchAsyncErrors = require('../middlewares/catchAsyncError');
const Stripe = require('stripe')
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

        console.log(session);

        res.status(200).json({
            success: true,
            url: session.url
        })
    })