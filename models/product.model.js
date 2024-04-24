const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
        },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        default: 0
        },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 0
        },
    image: {
        type: String,
        required: false,
        }
    },
    {
        timestamps: true,
    }
);

//Product -> products collection in MongoDB
const Product = mongoose.model('Product', productSchema);

module.exports = Product;


