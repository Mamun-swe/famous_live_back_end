const jwt = require('jsonwebtoken')
const Users = require('../../../models/users')
const rootURl = require('../../../utils/rootURL')


const getAllUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        const result = await Users.findOne({ _id: decode.id }, { block_users: 1, _id: 0 })
        const myBlockedUsers = result.block_users

        const allUsers = await Users.find(
            {
                $and: [
                    { "_id": { $nin: myBlockedUsers } },
                    { "_id": { $nin: decode.id } },
                    { "role": { $nin: ['admin'] } }
                ]
            },
            {
                name: 1,
                isLive: 1,
                status: 1,
                userLevel: 1,
                image: 1
            }
        ).exec()

        if (!allUsers) {
            return res.status(204).json('Users not found')
        }

        const response = {
            results: allUsers.map(user => {
                return {
                    id: user._id,
                    name: user.name,
                    status: user.status,
                    isLive: user.isLive,
                    userLevel: user.userLevel,
                    image: rootURl + "uploads/images/" + user.image,
                }
            })
        }
        res.status(200).json(response)


    } catch (error) {
        console.log(error.message)
        next(error)
    }
}


module.exports = {
    getAllUsers
}