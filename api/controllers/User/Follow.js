const Users = require('../../../models/users')
const jwt = require('jsonwebtoken')

// Make Follwo
const makeFollow = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(422).json({ message: 'Followid is required' })
        }

        let { followid } = req.body
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const checkAvailable = await Users.findOne({ _id: decode.id }).exec()
        if (!checkAvailable) {
            return res.json({ message: 'Not found' })
        }

        // Check available in follow list
        let checkFollowingAvailable = await checkAvailable.following.find(id => id == followid)
        if (checkFollowingAvailable) {
            return res.json({ message: 'Already following' })
        }

        const createFollowing = await Users.findOneAndUpdate(
            { _id: decode.id },
            { $push: { following: followid } },
            { new: true }
        ).exec()

        const createFollower = await Users.findOneAndUpdate(
            { _id: followid },
            { $push: { followers: decode.id } },
            { new: true }
        ).exec()

        if (createFollowing && createFollower) {
            return res.status(201).json({ message: 'success' })
        }

    } catch (error) {
        console.log(error.message);
        next(error)
    }
}


// Unfollow
const unFollowUser = async (req, res, next) => {
    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')
        const { unfollowId } = req.body

        const checkAvailable = await Users.findOne({ _id: decode.id }).exec()
        if (!checkAvailable) {
            return res.json({ message: 'Not found' })
        }

        // Check available in follow list
        let checkFollowingAvailable = await checkAvailable.following.find(id => id == unfollowId)
        if (!checkFollowingAvailable) {
            return res.json({ message: 'This user is not in your follow list' })
        }

        const removeFollwoing = await Users.findOneAndUpdate(
            { _id: decode.id },
            { $pull: { following: { $in: [`${unfollowId}`] } } },
            { multi: true }
        )

        const removeFollwer = await Users.findOneAndUpdate(
            { _id: unfollowId },
            { $pull: { followers: { $in: [`${decode.id}`] } } },
            { multi: true }
        )

        if (!removeFollwoing && !removeFollwer) {
            return res.json({ status: false, message: "Unfollow failed" })
        }

        res.json({ status: true, message: 'Successfully unfollow' })

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    makeFollow,
    unFollowUser
}