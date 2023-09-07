const mongoose = require("mongoose")
const Schema  = mongoose.Schema 

const subscriptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {timestamps: true});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;