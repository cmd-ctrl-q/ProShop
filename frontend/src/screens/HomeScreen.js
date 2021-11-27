import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product, i) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* access prop from within Product type */}
                        <Product key={product._id} product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
