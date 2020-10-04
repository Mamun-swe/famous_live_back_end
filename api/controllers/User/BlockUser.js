const Users = require('../../../models/users')
const jwt = require('jsonwebtoken')

const blockUser = async (req, res, next) => {
    try {
        let { blockId } = req.body
        if (!blockId) {
            return res.status(422).json({ message: 'blockId is required' })
        }

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const checkUser = await Users.findOne({ _id: decode.id }).exec()
        if (!checkUser) {
            return res.json({ message: 'Not found' })
        }

        // Check available in follow list
        let checkAvailable = await checkUser.block_users.find(id => id == blockId)
        if (checkAvailable) {
            return res.json({ message: 'Already blocked this user' })
        }

        const createBlock = await Users.findOneAndUpdate(
            { _id: decode.id },
            { $push: { block_users: blockId } },
            { new: true }
        ).exec()

        if (!createBlock) {
            return res.json({ status: false, message: "Failed to block user" })
        }

        res.json({ status: true, message: 'Successfully blocked user' })

    } catch (error) {
        console.log(error.message);
        if (error) next(error)
    }
}


module.exports = {
    blockUser
}