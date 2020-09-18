const jwt = require('jsonwebtoken')
const Users = require('../../../models/users')
const rootURl = require('../../../utils/rootURL')

const getAllUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')
        let id = decode.id

        const users = await Users.find(
            { _id: { $nin: [id] }, role: { $nin: ['admin'] } },
            { access_token: 0 }
        )
            .populate({ path: 'following', select: 'name phone image' })
            .populate({ path: 'followers', select: 'name phone image' })
            .exec()

        if (!users) {
            return res.status(204).json('Users not found')
        }

        const response = {
            results: users.map(user => {
                return {
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                    status: user.status,
                    isLive: user.isLive,
                    mainCoinBalane: user.mainCoinBalane,
                    presentCoinBalance: user.presentCoinBalance,
                    userLevel: user.userLevel,
                    image: rootURl + "uploads/images/" + user.image,
                    followers: user.followers.map(follower => {
                        return {
                            id: follower._id,
                            name: follower.name,
                            phone: follower.phone,
                            image: rootURl + "uploads/images/" + follower.image
                        }
                    }),
                    following: user.following.map(follow => {
                        return {
                            id: follow._id,
                            name: follow.name,
                            phone: follow.phone,
                            image: rootURl + "uploads/images/" + follow.image
                        }
                    })
                }
            })
        }
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllUsers
}