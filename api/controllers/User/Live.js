const jwt = require('jsonwebtoken')
const Users = require('../../../models/users')

const startLive = async (req, res, next) => {
    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const result = await Users.findOneAndUpdate({ _id: decode.id },
            { $set: { 'isLive': true } },
            { new: true })
            .exec()

        if (!result) {
            return res.status(500).json({ success: false, message: "Internal server error" })
        }

        res.status(200).json({ success: true, message: "Success live running" })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


const closeLive = async (req, res, next) => {
    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const result = await Users.findOneAndUpdate({ _id: decode.id },
            { $set: { 'isLive': false } },
            { new: true })
            .exec()

        if (!result) {
            return res.status(500).json({ success: false, message: "Internal server error" })
        }

        res.status(200).json({ success: true, message: "Live is stopped" })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    startLive,
    closeLive
}