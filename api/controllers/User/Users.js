const jwt = require('jsonwebtoken')
const Users = require('../../../models/users')

const getAllUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        let id = decode.id

        const users = await Users.find({ _id: { $nin: [id] } }, { name: 1, phone: 1 }).skip({ _id: id })
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllUsers
}