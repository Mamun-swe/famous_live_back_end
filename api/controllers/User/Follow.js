const Users = require('../../../models/users')

// Make Follwo
const makeFollow = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(422).json({ message: 'myid and followid is required' })
        }

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


// Live in from follower
const liveFromFollowingList = async(req, res, next) => {
    try {
        res.status(200).json({message: 'All live people from my follwer list'})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    makeFollow,
    liveFromFollowingList
}