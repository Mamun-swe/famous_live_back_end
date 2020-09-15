const User = require('../../models/users')
const jwt = require("jsonwebtoken")

// Account Register
const Register = async (req, res, next) => {
    try {
        let { name, phone } = req.body
        let existUser = await User.findOne({ phone: phone }).exec()

        if (existUser) {
            return res.status(200).json({
                message: "Account already created"
            })
        }

        const newUser = new User({
            name: name,
            phone: phone
        })

        let user = await newUser.save()
        if (user) {
            return res.status(201).json({
                message: "Account successfully created"
            })
        }
    } catch (error) {
        if (error.name == 'ValidationError') {
            let message = []
            for (field in error.errors) {
                message.push(error.errors[field].message)
            }

            return res.status(500).json({
                success: false,
                message
            })
        }

        next(error)
    }
}


// Login Account
const Login = async (req, res, next) => {
    let { phone } = req.body
    try {
        let user = await User.findOne({ phone }).exec()
        if (user) {
            const token = await jwt.sign({ id: user._id, name: user.name, role: user.role }, 'SECRET', { expiresIn: '1d' })
            const updateToken = await User.findOneAndUpdate({ _id: user._id }, { $set: { 'access_token': token } }, { new: true }).exec()
            if (updateToken) {
                return res.status(200).json({
                    message: "success",
                    token
                })
            }
            return res.status(204).json({
                message: "Failed to login"
            })
        } else {
            return res.status(204).json({
                message: "Failed to login"
            })
        }
    } catch (error) {
        next(error)
    }
}


// My Information
const MyInfo = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        let id = decode.id

        const my_info = await User.findOne({ _id: id })
            .populate({ path: 'following', select: 'name phone' })
            .populate({ path: 'followers', select: 'name phone' })
            .exec()
        if (!my_info) {
            return res.status(204).json('Not available')
        }

        res.status(200).json({ my_info })

    } catch (error) {
        next(error)
    }
}


// Logout
const Logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        let user = await User.findOne({ $and: [{ _id: decode.id }, { role: decode.role }] })
        if (user) {
            const updateToken = await User.findByIdAndUpdate({ _id: decode.id }, { $set: { 'access_token': null } })
            if (updateToken) {
                return res.status(200).json({
                    message: true
                })
            }
        }
        return res.status(422).json({ message: "Unauthorized" })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    Register,
    Login,
    MyInfo,
    Logout
}