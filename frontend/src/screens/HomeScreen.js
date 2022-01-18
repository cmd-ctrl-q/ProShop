import React, { useEffect } from 'react'
// useDispatch dispatches actions
// useSelector selects parts of the state, (eg productList)
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const keyword = useParams('keyword').keyword

    // create hook
    const dispatch = useDispatch()

    // get the productList from the state
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList

    useEffect(() => {
        // make request to backend to get products using the dispatcher
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])  // pass dispatch as a dependency

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen
