const Users = require('../../../models/users')

const countAllTypesUser = async (req, res, next) => {
    try {
        const usersTotal = await Users.find({ role: 'user' }).count().exec()
        const updateRequests = await Users.find({ new_name: { $nin: [null, ""] } }).count().exec()
        if (!usersTotal && !updateRequests) {
            return res.json({ status: false, message: 'No result found' })
        }
        res.status(200).json({ status: true, usersTotal, updateRequests })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    countAllTypesUser
}