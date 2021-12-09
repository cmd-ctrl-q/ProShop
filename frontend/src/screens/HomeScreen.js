import React, { useState, useEffect } from 'react'
// useDispatch dispatches actions
// useSelector selects parts of the state, (eg productList)
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {

    // create hook
    const dispatch = useDispatch()

    // get the productList from the state
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList

    useEffect(() => {
        // make request to backend to get products using the dispatcher
        dispatch(listProducts())
    }, [dispatch])  // pass dispatch as a dependency

    // if (loading) {
    //     return <p>Loading...</p>
    // } else if (error) {
    //     return <p>{error.message}</p>
    // }

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h3>{error}</h3>
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
