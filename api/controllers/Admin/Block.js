const Users = require('../../../models/users')

const blockUnblockUser = async (req, res, next) => {
    try {
        let { blockId, status } = req.body
        if (!blockId) {
            return res.status(422).json({ message: 'blockId is required' })
        }

        const result = await Users.findOneAndUpdate(
            { _id: blockId, role: 'user' },
            { $set: { account_status: status } },
            { new: true }
        ).exec()

        if (!result) {
            return res.json({ status: false, message: "Failed to block user" })
        }

        res.json({ status: true, message: `Successfully ${status} user` })
    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = { blockUnblockUser }