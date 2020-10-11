const Users = require('../../../models/users')

const countAllTypesUser = async (req, res, next) => {
    try {
        const usersTotal = await Users.find({ role: 'user' }).count().exec()
        if (!usersTotal) {
            return res.json({ status: false, message: 'No result found' })
        }
        res.status(200).json({ status: true, usersTotal })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    countAllTypesUser
}