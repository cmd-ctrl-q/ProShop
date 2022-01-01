import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = () => {
    let productId = useParams('id').id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
            // navigate(-1) 
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [dispatch, product, productId])

    const submitHandler = (e) => {
        // prevent page from refreshing
        e.preventDefault()
        // UPDATE PRODUCT
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loading 
                    ? <Loader /> 
                    : error 
                    ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>
                            {/* NAME */}
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Enter name' 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            {/* PRICE */}
                            <Form.Group controlId='email' className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter price' 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            {/* IMAGE */}
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter image url' 
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            {/* BRAND */}
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter brand' 
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            {/* COUNT IN STOCK */}
                            <Form.Group controlId='countInStock' className='mb-3'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter count in stock' 
                                    value={countInStock}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            {/* CATEGORY */}
                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter category' 
                                    value={category}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>


                            {/* DESCRIPTION */}
                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter description' 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>

        </>
    )
}

export default ProductEditScreen
