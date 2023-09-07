const Organization = require("../model/organization")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

exports.registerOrganization = async (req, res) => {
    try {
        const { name, email, password, subscriptionId } = req.body
        const isExist = await Organization.findOne({ email })
        if (isExist) {
            return res.status(200).json({ success: false, msg: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const organDetait = new Organization({
            name, email, password: hashedPassword, subscriptionId
        })
        if (organDetait) {
            await organDetait.save()
            return res.status(200).json({ success: true, msg: "Successfully Register!!", organDetait: organDetait })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error })
    }

}

// exports.getOrganization = async (req, res) => {
//     console.log("req.body.page", req.body.page, "req.body.limit ", req.body.limit, "req.body.keyword", req.body.keyword);
//     console.log("--------------->", req.body.status);

//     try {
//         // const { _id } = req.body
//         const organDetait = await Organization.find()

//         if (!organDetait) {
//             return res.status(404).json({ success: false, msg: "User Not found" })
//         }
//         else {
//             return res.status(200).json({ success: true, msg: "Data Get Successfully", organDetait: organDetait })
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, msg: "Internal Server Error" })
//     }
// }

exports.getOrganization = async (req, res) => {
    // console.log("req.body.page", req.body.page, "req.body.limit ", req.body.limit, "req.body.keyword", req.body.keyword);
    // console.log("--------------->", req.body.status);

    try {
        const organDetait = await Organization.find()

        if (!organDetait) {
            return res.status(404).json({ success: false, msg: "User Not found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Data Get Successfully", organDetait: organDetait })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" })
    }
}

exports.deleteOrganization = async (req, res) => {
    try {
        const { _id } = req.query
        const organDetait = await Organization.findByIdAndRemove({ _id: _id })
        if (organDetait) {
            return res.status(200).json({ success: true, msg: "Delete Successfully" })
        }
        else {
            return res.status(200).json({ success: true, msg: "User Not Found" })
        }
    } catch (error) {
        return res.status(404).json({ msg: error })
    }
}

exports.updateOrganization = async (req, res) => {
    try {
        const { _id, subscriptionId } = req.body
        const organDetait = await Organization.findByIdAndUpdate({ _id: _id }, { subscriptionId: subscriptionId })
        if (organDetait) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                auth: {
                    user: 'onlytulsi.1@gmail.com',
                    pass: 'wyjcrudwsretxwug'
                },
            });

            await transporter.sendMail({
                to: organDetait.email,
                subject: 'Login to your account',
                html: `Hello ${organDetait.subscriptionId} Successfully Updated`,
            });
            return res.status(200).json({ success: true, msg: "Update Successfully" })
        }
        else {
            return res.status(200).json({ success: true, msg: "User Not Update" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: error })
    }
}

exports.loginOrganization = async (req, res) => {
    try {
        const { email, password } = req.body

        const organDetait = await Organization.findOne({ email })
        if (!organDetait) {
            return res.status(401).json({ success: false, msg: "Not Register!!" })
        }

        if (!organDetait.isActive) {
            return res.status(401).json({ success: false, msg: "Your Account is Temporarly Deactivated" });
        }

        const passCompare = await bcrypt.compare(password, organDetait.password)

        if (!passCompare) {
            return res.status(401).json({ success: false, msg: "Invalid Password" })
        }

        else if (organDetait) {
            // const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);
            const token = jwt.sign({ organDetait: organDetait }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

            const deviceInfo = req.headers['user-agent'];
            const loginTime = new Date().toLocaleString();
            const ipAddress = req.ip;


            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                auth: {
                    user: 'onlytulsi.1@gmail.com',
                    pass: 'wyjcrudwsretxwug'
                },
            });

            await transporter.sendMail({
                to: organDetait.email,
                subject: 'Login to your account',
                html: `Hello ${organDetait.name}, welcome to Your App! Your last login on ${loginTime} was from: ${deviceInfo}. IP Address: ${ipAddress}`,
            });
            return res.status(200).json({ success: true, msg: "Login Successfully", token: token })
        }
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

exports.changePassOrganization = async (req, res) => {
    const { _id, password, newPassword } = req.body
    try {
        const user = await Organization.findById(_id)

        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        else {

            const isCompare = await bcrypt.compare(password, user.password);

            if (!isCompare) {
                return res.status(404).json({ msg: "Invalid Old Password" })
            }
            else {
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedNewPassword;
                await user.save();
                return res.status(200).json({ msg: 'Password changed successfully' });
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}


exports.searchOrganization = async (req, res) => {
    try {
        const { name } = req.query
        
        const organDetail = await Organization.find({ name: { $regex: new RegExp(name, 'i') } });
        if (!organDetail) {
            return res.status(204).json({ success: false, msg: 'Empty' });
        }
        else {
            return res.status(200).json({ success: true, msg: 'Detail Found', data: organDetail });
        }
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
    
}

exports.OrganizationStatus = async (req, res) => {
    
    const {status, _id} = req.body
    try {
        if (status === "activate") {
            const user = await Organization.findByIdAndUpdate(_id, { isActive: true })
            return res.status(200).json({ success: true, msg: "Account Activated", user: user })
        }
        else {
            const user = await Organization.findByIdAndUpdate(_id, { isActive: false })
            return res.status(200).json({ success: true, msg: "Account Deactive", user: user })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error", error })
    }
}

exports.forgetPassOrganization = async (req, res) => {

}