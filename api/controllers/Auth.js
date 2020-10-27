const User = require('../../models/users')
const jwt = require("jsonwebtoken")
const rootURl = require('../../utils/rootURL')

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
        let user = await User.findOne({ phone, account_status: 'confirmed' }).exec()
        if (user) {
            const token = await jwt.sign({ id: user._id, name: user.name, role: user.role }, 'SECRET', { expiresIn: '1d' })
            const updateToken = await User.findOneAndUpdate({ _id: user._id },
                { $set: { 'access_token': token, status: 'online' } },
                { new: true })
                .exec()
            if (updateToken) {
                return res.status(200).json({
                    message: "success",
                    token
                })
            }
            return res.json({
                message: "Failed to login"
            }).status(204)
        } else {
            return res.json({
                message: "Failed to login"
            }).status(204)
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
            .populate({ path: 'following', select: 'name phone isLive status userLevel image' })
            .populate({ path: 'followers', select: 'name phone isLive status userLevel image' })
            .exec()
        if (!my_info) {
            return res.status(204).json('Not available')
        }

        // on live users
        const liveArray = []
        const liveUsers = my_info.following.map(follow => {
            if (follow.isLive === true) {
                const data = {
                    id: follow.id,
                    name: follow.name,
                    phone: follow.phone,
                    isLive: follow.isLive,
                    status: follow.status,
                    userLevel: follow.userLevel,
                    image: rootURl + "uploads/images/" + follow.image
                }
                return liveArray.push(data)
            }
        })

        const response = {
            id: my_info._id,
            name: my_info.name,
            phone: my_info.phone,
            role: my_info.role,
            status: my_info.status,
            isLive: my_info.isLive,
            mainCoinBalane: my_info.mainCoinBalane,
            presentCoinBalance: my_info.presentCoinBalance,
            userLevel: my_info.userLevel,
            image: rootURl + "uploads/images/" + my_info.image,
            followers: my_info.followers.map(follower => {
                return {
                    id: follower.id,
                    name: follower.name,
                    phone: follower.phone,
                    isLive: follower.isLive,
                    status: follower.status,
                    userLevel: follower.userLevel,
                    image: rootURl + "uploads/images/" + follower.image
                }
            }),
            following: my_info.following.map(follow => {
                return {
                    id: follow.id,
                    name: follow.name,
                    phone: follow.phone,
                    isLive: follow.isLive,
                    status: follow.status,
                    userLevel: follow.userLevel,
                    image: rootURl + "uploads/images/" + follow.image
                }
            }),
            isLiveUsers: liveArray
        }
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}


// Logout
const Logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        let user = await User.findOne({ _id: decode.id })
        if (user) {
            const updateToken = await User.findByIdAndUpdate(
                { _id: decode.id },
                {
                    $set: { 'access_token': null, status: 'offline', isLive: 'false' }
                })
            if (updateToken) {
                return res.status(200).json({
                    message: true
                })
            }
        }
        return res.status(422).json({ message: "Unauthorized" })
    } catch (error) {
        next(error)
        console.log(error.message);
    }
}



module.exports = {
    Register,
    Login,
    MyInfo,
    Logout
}