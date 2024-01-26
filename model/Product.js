const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
 brand:String,
 category:String,
 price:Number,
 discount:Number,
 image:String
});

const Product = mongoose.model('Product', ProductSchema, 'Product');

module.exports = {
  Product,
};
