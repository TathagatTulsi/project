const mongoose = require("mongoose")
const Schema  = mongoose.Schema 

const userSchema = new Schema({
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
  subscriptionId: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {timestamps: true});

const Organization = mongoose.model('Organization', userSchema);

module.exports = Organization;