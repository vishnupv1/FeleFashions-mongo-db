const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    productName: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: String,
    },
    productImage: {
        type: String,
    },
    brand: {
        type: String,
    }
})

module.exports = mongoose.model('Product', productSchema)
