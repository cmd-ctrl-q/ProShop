import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// state is the initial state
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            // check if item already exists in cart 
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                // no new item, just return previous state 
                return {
                    ...state, 
                    cartItems: state.cartItems.map(
                        x => x.product === existItem.product ? item : x
                    )
                }
            } else {
                // push new item to array 
                return {
                    // spread whats already in the state
                    ...state,
                    // add the current state items into cartItems and the new item because it didn't exist before
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state, 
                // remove the item from list
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        default:
            return state
    }
}