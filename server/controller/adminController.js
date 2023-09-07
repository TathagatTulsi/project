const Admin = require("../model/admin")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

exports.registerAdmin = async (req, res) => {
    try {
        const hashPass = await bcrypt.genSalt(10)

        const adminUser = new Admin({
            userName: "onlytulsi",
            email: "onlytulsi.1@gmail.com",
            password: await bcrypt.hash("onlytulsi", hashPass)
        })

        const result = await adminUser.save()
        return res.status(200).json({ success: true, msg: "Successfully Register", result: result })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}


// exports.loginAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body

//         const adminUser = await Admin.findOne({ email })
//         if(!adminUser && !hashPass){
//             return res.status(401).json({ success: false, msg: "Invalid Credintial" })
//         }
//         const hashPass = await bcrypt.compare(password, adminUser.password)

//         if (!hashPass) {
//             return res.status(404).json({ success: false, msg: "Invalid Credintial" })
//         }
//         else {
//             const token = jwt.sign({ token: adminUser }, process.env.TOKEN_SECRET, { expiresIn: "1h" })
//             return res.status(200).json({ success: true, msg: "Successfully Login", token: token })
//         }

//         // if (!(adminUser?.password === password && adminUser?.email === email)) {
//         //     return res.status(404).json({ success: false, msg: "Invalid Credintial" })
//         // }
//         // else if (adminUser.password === password) {
//         //     const token = jwt.sign({token: adminUser}, process.env.TOKEN_SECRET, {expiresIn: "1h"})
//         //     return res.status(200).json({ success: true, msg: "Successfully Login", token:token })
//         // }

//     } catch (error) {
//         return res.status(500).json({ msg: error })
//     }
// }


exports.loginAdmin = async (req, res) => {
    try {
        const {userName, email, password } = req.body

        // const adminUser = await Admin.findOne({email});
        // const adminUserName = await Admin.findOne({userName})

        const adminUser = await Admin.findOne({ $and: [{ email }, { userName }] });

        if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
            return res.status(404).json({ success: false, msg: "Invalid Credential" })
        } else {
            const token = jwt.sign({ token: adminUser }, process.env.TOKEN_SECRET, { expiresIn: "1h" })
            return res.status(200).json({ success: true, msg: "Successfully Login", token: token })
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
