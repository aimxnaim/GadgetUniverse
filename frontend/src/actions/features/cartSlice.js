import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItem: localStorage.getItem('cartItem')
        ? JSON.parse(localStorage.getItem('cartItem'))
        : [],
}

export const cartSlice = createSlice({
    initialState,
    name: 'cartSlice',
    reducers: {
        setCartItem: (state, action) => {
            const item = action.payload;

            const isItemExist = state.cartItem.find(
                (i) => i.product === item.product
            )

            if (isItemExist) {
                // Update the quantity of the existing item , if it not exist then it will add the item, if it exist then it will update the quantity of the item
                state.cartItem = state.cartItem.map((i) =>
                    i.product === item.product ? item : i
                )
            } else { // Add the item to the cart
                state.cartItem = [...state.cartItem, item]
            }

            localStorage.setItem('cartItem', JSON.stringify(state.cartItem))
        }
    }
})

// Action creators are generated for each case reducer function
export default cartSlice.reducer;

// Action creators
export const { setCartItem } = cartSlice.actions;