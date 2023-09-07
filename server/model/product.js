const mongoose = require("mongoose")
const Schema  = mongoose.Schema 

const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },

}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;