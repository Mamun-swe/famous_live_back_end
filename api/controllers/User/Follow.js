const Users = require('../../../models/users')
const checkId = require('../../middleware/mongooseId')

const UserFollow = async (req, res, next) => {
    try {
        let { myid, followid } = req.body

        const createFollowing = await Users.findOneAndUpdate(
            { _id: myid },
            { $push: { following: followid } },
            { new: true }
        ).exec()

        const createFollower = await Users.findOneAndUpdate(
            { _id: followid },
            { $push: { followers: myid } },
            { new: true }
        ).exec()

        if (createFollowing && createFollower) {
            return res.status(201).json({ message: 'success' })
        }

    } catch (error) {
        next(error)
    }
}


const following = async (req, res, next) => {
    const { id } = req.params
    try {

        await checkId(id)
        const meFollowing = await Users.findOne({ _id: id })
            .populate({ path: 'following', select: 'name phone' })
            .populate({ path: 'followers', select: 'name phone' })
            .exec()
        if (!meFollowing) {
            return res.status(204).json('Not available')
        }

        res.status(200).json({ meFollowing })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    UserFollow,
    following
}