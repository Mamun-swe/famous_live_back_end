const Users = require('../../../models/users')
const jwt = require('jsonwebtoken')

const nameUpdateRequest = async (req, res, next) => {

    let { newName } = req.body
    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const updateName = await Users.findOneAndUpdate(
            { _id: decode.id },
            { $set: { new_name: newName } },
            { new: true }
        ).exec()

        if (!updateName) {
            return res.json({ status: false, message: 'Name update request failed.' })
        }

        res.json({ status: true, message: 'Your request has been send to admin.' })

    } catch (error) {
        if (error) next(error)
    }
}



module.exports = {
    nameUpdateRequest
}