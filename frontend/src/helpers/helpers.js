export const getPriceQueryParams = (searchParams, key, value) => {
    const hasValueInParam = searchParams.get(key)

    if (value && hasValueInParam) {
        searchParams.set(key, value)
    } else if (value) {
        searchParams.append(key, value)
    } else if (hasValueInParam) {
        searchParams.delete(key)
    }

    return searchParams;
}

export const calculateOrderCost = (cartItem) => {
    const itemsPrice = cartItem?.reduce(
        (acc, item) => acc + item.price * item.quantity, 0)

    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.06 * itemsPrice)).toFixed(2)
    const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)

    return {
        itemsPrice: Number(itemsPrice).toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice: totalPrice.toFixed(2)
    }
}