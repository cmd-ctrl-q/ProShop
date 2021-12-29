import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = () => {
    let userId = useParams('id').id

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch() 

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if (!user || !user.name || user._id !== userId) {
            // fetch user 
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId])

    const submitHandler = (e) => {
        // prevent page from refreshing
        e.preventDefault()
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
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

                            {/* EMAIL */}
                            <Form.Group controlId='email' className='mb-3'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                    type='email' 
                                    placeholder='Enter email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            {/* EMAIL */}
                            <Form.Group controlId='isadmin'>
                                <Form.Check 
                                    type='checkbox' 
                                    label='Is Admin' 
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
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

export default UserEditScreen
