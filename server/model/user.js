const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Validate phone number format (10 digits)
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
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


}, {timestamps: true})

const userinfo = mongoose.model("user", userSchema)
module.exports = userinfo