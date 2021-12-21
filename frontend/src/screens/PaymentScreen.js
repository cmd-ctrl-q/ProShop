import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {

    // get cart from state
    const cart = useSelector(state => state.cart)
    // pull shippingAddress from cart
    const { shippingAddress } = cart

    const navigate = useNavigate()

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch() 

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))

        navigate('/placeorder')
    }

    return <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        {/* paypal */}
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card' 
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>

                        {/* stripe */}
                        {/* <Form.Check 
                            type='radio' 
                            label='Stripe' 
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>
        </FormContainer>
}

export default PaymentScreen
