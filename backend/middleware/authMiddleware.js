import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('decoded: ', decoded)

            // await to find user id but dont return password
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    // check authenticity of token 
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { protect }