import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
    let userId = useParams('id').id

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate 
    } = userUpdate

    useEffect(() => {
        // check success for update, reset user state and redirect to user list 
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            // redirect admin back to user list 
            // navigate('/admin/uselist')
            navigate(-1) // navigate user back
        } else {
            if (!user || !user.name || user._id !== userId) {
                // fetch user 
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, user, userId, successUpdate])

    const submitHandler = (e) => {
        // prevent page from refreshing
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
