const Subscription = require("../model/subscription")
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

exports.addSuscriber = async (req, res) => {
    const { name, price } = req.body
    try {
        const subAdd = new Subscription({ name: name, price: price })
        await subAdd.save()
        return res.status(200).json({ success: true, msg: "Subscription Add Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
}

exports.getSuscriber = async (req, res) => {
    try {
        const subAdd = await Subscription.find()
        if (!subAdd) {
            return res.status(404).json({ success: false, msg: "User Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Success", subAdd: subAdd })
        }
    } catch (error) {
        return res.status(200).json({ success: false, error })
    }
}

exports.deleteSuscriber = async (req, res) => {
    const { _id } = req.query
    try {
        const suscriber = await Subscription.findByIdAndRemove(_id)
        return res.status(200).json({ success: true, msg: "Success", suscriber: suscriber })
    } catch (error) {
        return res.status(200).json({ success: false, error })
    }
}

exports.updateSuscriber = async (req, res) => {
    const { _id, price, name } = req.body
    try {
        const suscriber = await Subscription.findByIdAndUpdate({ _id: _id }, { price: price, name:name}, { new: true })
        if (!suscriber) {
            return res.status(404).json({ success: false, msg: "User Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Success", suscriber: suscriber })
        }
    } catch (error) {
        return res.status(200).json({ success: false, error })
    }
}

exports.searchSuscriber = async (req, res) => {
    const { _id } = req.body
    try {
        const suscriber = await Subscription.find({ _id: _id })
        if (!suscriber) {
            return res.status(404).json({ success: false, msg: "Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Success", suscriber: suscriber })
        }
    } catch (error) {
        return res.status(200).json({ success: false, error })
    }
}