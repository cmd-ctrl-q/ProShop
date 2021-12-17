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

// add middleware before saving
userSchema.pre('save', async function (next) {
    // do not salt password if it hasn't been modified
    if (!this.isModified('password')) {
        next()
    }

    // use await because genSalt returns a promise 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User