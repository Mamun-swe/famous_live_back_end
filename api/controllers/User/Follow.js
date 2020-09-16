const Users = require('../../../models/users')

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


module.exports = {
    makeFollow
}