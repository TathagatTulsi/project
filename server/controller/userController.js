const userinfo = require("../model/user")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
// const UAParser = require('ua-parser-js');

exports.addUser = async (req, res) => {
    const { name, email, phone, password, organizationId } = req.body
    try {
        const isExist = await userinfo.findOne({ email })
        if (isExist) {
            return res.status(200).json({ success: false, msg: "User already exist" })
        }
        else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new userinfo({ name, email, phone, password: hashedPassword, organizationId })
            if (user) {
                const result = await user.save()
                return res.status(200).json({ success: true, msg: "Successfully Register!!", result: result })
            }
            else {
                res.status(200).json({ msg: "error for creating account" })
            }
        }
    } catch (error) {
        return res.status(404).json({ msg: error })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { _id, name } = req.body
        const user = await userinfo.findByIdAndUpdate({ _id: _id }, { name: name })
        if (user) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                auth: {
                    user: 'onlytulsi.1@gmail.com',
                    pass: 'wyjcrudwsretxwug'
                },
            });

            await transporter.sendMail({
                to: user.email,
                subject: 'Login to your account',
                html: `Hello ${user.name}, Successfully Updated`,
            });
            return res.status(200).json({ success: true, msg: "Update Successfully" })
        }
        else {
            return res.status(200).json({ success: true, msg: "User Not Update" })
        }
    } catch (error) {

    }
}
exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.query
        const user = await userinfo.findByIdAndRemove({ _id: _id })
        if (user) {
            return res.status(200).json({ success: true, msg: "Delete Successfully" })
        }
        else {
            return res.status(200).json({ success: true, msg: "User Not Found" })
        }
    } catch (error) {
        return res.status(404).json({ msg: error })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userinfo.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, msg: "User Not Found" })
        }

        if (!user.isActive) {
            return res.status(401).json({ success: false, msg: "Your Account is Temporarly Deactivated" });
        }

        const passCompare = await bcrypt.compare(password, user.password)

        if (!passCompare) {
            return res.status(401).json({ success: false, msg: "Invalid Password" })
        }

        else if (user) {
            const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

            const deviceInfo = req.headers['user-agent'];
            const loginTime = new Date().toLocaleString();
            const ipAddress = req.ip;

            // const parser = new UAParser(deviceInfo);
            // const browserInfo = parser.getResult();
            // const osInfo = browserInfo.os;

            const emailContent = `
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <h1>Hello ${user.name},</h1>
                        <p>Welcome to Your App! Your last login on ${loginTime} was from:</p>
                        <p><strong>Device Information:</strong> ${deviceInfo}</p>
                        <p><strong>IP Address:</strong> ${ipAddress}</p>
                        <p>Thank you for using our app!</p>
                    </div>
                </div>
            </div>
        `;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                auth: {
                    user: 'onlytulsi.1@gmail.com',
                    pass: 'wyjcrudwsretxwug'
                },
            });

            await transporter.sendMail({
                to: user.email,
                subject: 'Login to your account',
                html: emailContent
                // html: `Hello ${user.username}, welcome to Your App! Your last login on ${loginTime} was from: ${deviceInfo}. IP Address: ${ipAddress}`,
            });

            return res.status(200).json({ success: true, msg: "Login Successfully", token: token })
        }

    } catch (error) {
        return res.status(404).json({ msg: error })
    }
}

// exports.getUser = async (req, res) => {
    
//     try {
//         const user = await userinfo.find()
//         if (!user) {
//             return res.status(404).json({ success: false, msg: "User Not found" })
//         }
//         else {
//             return res.status(200).json({ success: true, msg: "Data Get Successfully", user: user })
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, msg: "Internal Server Error" })
//     }
// }

exports.getUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const users = await userinfo.find().skip(skip).limit(limit); 

        const totalUsers = await userinfo.countDocuments();

        if (users.length === 0) {
            return res.status(404).json({ success: false, msg: "No users found" });
        } else {
            return res.status(200).json({success: true, msg: "Data Get Successfully", users: users, currentPage: page, totalPages: Math.ceil(totalUsers / limit) });
        }
        
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}


exports.updateStatus = async (req, res) => {
    const { status, _id } = req.body

    try {
        if (status === "activate") {
            const user = await userinfo.findByIdAndUpdate(_id, { isActive: true })
            return res.status(200).json({ success: true, msg: "Account Activated", user: user })
        }
        else {
            const user = await userinfo.findByIdAndUpdate(_id, { isActive: false })
            return res.status(200).json({ success: true, msg: "Account Deactive", user: user })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error", error })
    }
}
// exports.changePassword = async (req, res) => {
//     try {
//         const { password, newPassword, _id } = req.body;
//         // const userId = req.user.userId;

//         const user = await userinfo.findById(_id);

//         if (!user) {
//             return res.status(404).json({ success: false, msg: "User not found" });
//         }

//         const passCompare = await bcrypt.compare(password, user.password);

//         if (!passCompare) {
//             return res.status(401).json({ success: false, msg: "Current password is incorrect" });
//         }

//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//         user.password = hashedNewPassword;
//         await user.save();

//         return res.status(200).json({ success: true, msg: "Password changed successfully" });

//     } catch (error) {
//         return res.status(500).json({ success: false, msg: "Internal Server Error" });
//     }
// }


exports.changePassword = async (req, res) => {
    const { _id, password, newPassword } = req.body
    try {
        const user = await userinfo.findById(_id)

        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        else {

            const isCompare = await bcrypt.compare(password, user.password);

            console.log("compare", isCompare)
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
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     port: 587,
        //     auth: {
        //         user: 'onlytulsi.1@gmail.com',
        //         pass: 'wyjcrudwsretxwug'
        //     },
        // });

        // await transporter.sendMail({
        //     to: user.email,
        //     subject: 'Login to your account',
        //     html: `Hello ${user.name}, your password is Updated`,
        // });
    } catch (error) {
        return res.status(404).json({ msg: error })
    }
}

exports.searchUser = async (req, res) => {
    try {
        const { name } = req.query
        const user = await userinfo.find({ name: { $regex: new RegExp(name, 'i') } });
        if (!user) {
            return res.status(204).json({ success: false, msg: 'user not found' });
        }
        else {
            return res.status(200).json({ success: true, msg: 'match', user: user });
        }
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

// exports.searchUser = async (req, res) => {
//     try {
//         const { keyword } = req.query;

//         // Search for users in the database based on the keyword
//         const users = await userinfo.find({
//             $or: [
//                 { username: { $regex: keyword, $options: 'i' } }, // Case-insensitive username search
//                 { email: { $regex: keyword, $options: 'i' } } // Case-insensitive email search
//             ]
//         });

//         return res.status(200).json({ success: true, users: users });

//     } catch (error) {
//         return res.status(500).json({ success: false, msg: "Internal Server Error" });
//     }
// }


exports.forgetPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await userinfo.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            //secure: false, // true for 465, false for other ports
            auth: {
                user: 'onlytulsi.1@gmail.com',
                pass: 'wyjcrudwsretxwug'
            },
        });

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `<p>Click <a href="http://localhost:3500/forgetPassword/${user._id}/${resetToken}">here</a> to reset your password.</p>`,
        });
        return res.status(200).json({ message: 'Password reset link send to your register email ID' });

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
}


exports.requestOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000);

        // Store the OTP in the user's record in the database
        const user = await userinfo.findOneAndUpdate({ email }, { otp }, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: 'onlytulsi.1@gmail.com',
                pass: 'wyjcrudwsretxwug'
            },
        });

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `Your OTP for login is: ${otp}`,
        });

        return res.status(200).json({ success: true, msg: "OTP sent successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await userinfo.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(401).json({ success: false, msg: "Invalid OTP" });
        }

        const currentTime = new Date();
        const otpExpiry = new Date(user.otpExpiry);

        if (currentTime > otpExpiry) {
            return res.status(401).json({ success: false, msg: "OTP has expired" });
        }

        // Clear the OTP and related data after successful verification
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({ success: true, msg: "OTP verified successfully", user: user });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
}