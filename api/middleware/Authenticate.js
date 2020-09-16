const jwt = require('jsonwebtoken')
const User = require('../../models/users')


const AdminPermission = async (req, res, next) => {
    const token = await req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Token not found' })
    }

    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        // find user using token 
        let user = await User.findOne(
            {
                $and: [{ _id: decode.id }, { access_token: splitToken }]
            },
            { role: decode.role })
            .exec()
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // check role
        if (user.role === 'admin') {
            return next()
        }
        return res.status(401).json({ message: 'unauthorized request' })

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(410).json({ message: 'Token expired' })
        }
        return res.status(501).json({ message: 'unauthorized request' })
    }
}


const UserPermission = async (req, res, next) => {
    const token = await req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Token not found' })
    }

    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        // find user using token 
        let user = await User.findOne(
            {
                $and: [{ _id: decode.id }, { access_token: splitToken }]
            },
            { role: decode.role })
            .exec()
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // check role
        if (user.role === 'user') {
            return next()
        }
        return res.status(401).json({ message: 'unauthorized request' })

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(410).json({ message: 'Token expired' })
        }
        return res.status(501).json({ message: 'unauthorized request' })
    }
}

module.exports = {
    AdminPermission,
    UserPermission
}