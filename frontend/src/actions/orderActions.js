import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // get access to logged in users info
        // get userInfo which is in userLogin
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        // make put request to backend, to update user profile
        const { data } = await axios.post(`/api/orders`, order, config)

        // dispatch user login success 
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}