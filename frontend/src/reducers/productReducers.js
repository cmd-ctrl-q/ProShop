import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from '../constants/productConstants'
// handles state for product list 
// actions dispatches an action to the productListReducer
// the initial state for products is an empty array
export const productListReducer = (state = { product: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            // request is currently loading
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            // the products payload can be accessed from action
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            // return initial state
            return state
    }
}
