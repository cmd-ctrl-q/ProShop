import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean, 
        required: true, 
        default: false
    },
}, {
    timestamps: true
})

// compares if user entered password matches the password in the database
// this.password comes from matchPassword
userSchema.methods.matchPassword = async function(enteredPassword) {
    // returns a promise so use await
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User