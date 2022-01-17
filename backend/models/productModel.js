import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    // one review rating
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        // admin that creates the product
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // adds relationship between product and user
    },
    name: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true,
    },
    brand: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true, 
    },
    description: {
        type: String, 
        required: true, 
    },
    reviews: [reviewSchema],
    // average of all review ratings
    rating: {
        type: Number, 
        required: true,
        default: 0
    },
    numReviews: {
        type: Number, 
        required: true, 
        default: 0
    },
    price: {
        type: Number, 
        required: true, 
        default: 0
    },
    countInStock: {
        type: Number, 
        required: true, 
        default: 0
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product