import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
    const productId = useParams('id').id

    const search = useLocation().search
    // search.split('=')[1] // to get the qty
    const qty = new URLSearchParams(search).get('qty')

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch addToCart if there is an id in the url
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>Cart</div>
    )
}

export default CartScreen