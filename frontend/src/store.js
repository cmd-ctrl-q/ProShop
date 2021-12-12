import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
const reducer = combineReducers({
    // stateName: reducer
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

// if cartItems is in localstorage then retrieve it, else set to []
const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartitems')) 
    : []

// initial state that will get loaded first
const initialState = {
    cart: {cartItems: cartItemsFromStorage},
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store
