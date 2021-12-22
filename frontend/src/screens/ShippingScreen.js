import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {

    // get cart from state
    const cart = useSelector(state => state.cart)
    // pull shippingAddress from cart
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        // save shipping address
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        // move to next page (payment page)
        navigate('/payment')
    }

    return <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                {/* address */}
                <Form.Group controlId='address' className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter address' 
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* city */}
                <Form.Group controlId='city' className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter city' 
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* postal code */}
                <Form.Group controlId='postalCode' className='mb-3'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter postalCode' 
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* country */}
                <Form.Group controlId='country' className='mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter country' 
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>
        </FormContainer>
}

export default ShippingScreen