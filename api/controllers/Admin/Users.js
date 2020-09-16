const jwt = require('jsonwebtoken')
const Users = require('../../../models/users')

const allUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        let id = decode.id

        const users = await Users.find({ _id: { $nin: [id] } }, { name: 1, phone: 1 })
            .populate({ path: 'following', select: 'name phone' })
            .populate({ path: 'followers', select: 'name phone' })
            .exec()
        if (!users) {
            return res.status(204).json('Not available')
        }

        res.status(200).json({ users })
    } catch (error) {
        // next(error)
        console.log(error);
    }
}

module.exports = {
    allUsers
}