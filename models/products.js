const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Please provide name'],
      unique: true,
      maxlength: 50,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,     
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array 
    },
    size: {
      type: String 
    },
    color: {
      type: String 
    },
    price: {
      type: Number, 
      required: true 
    }
    
},{ timestamps: true }
)
module.exports = mongoose.model('Products', ProductSchema)