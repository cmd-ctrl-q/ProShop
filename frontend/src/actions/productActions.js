import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from '../constants/productConstants'
import axios from 'axios'

// action creator. async dispatch actions
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ 
            type: PRODUCT_LIST_REQUEST
        })

        // destructure data 
        const { data } = await axios.get('/api/products')

        // dispatch the product list success
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            // error.message is generic and error.response.data.message is custom 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}