import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

// getState gets the entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id, 
            name: data.name,
            image: data.image,
            price: data.price, 
            countInStock: data.countInStock,
            qty
        }
    })

    // add entire cart to local storage 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}