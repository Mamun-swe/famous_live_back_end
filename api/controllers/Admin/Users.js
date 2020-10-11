const jwt = require('jsonwebtoken')
const Users = require('../../../models/users')
const rootURl = require('../../../utils/rootURL')


// Fetch All Users
const allUsers = async (req, res, next) => {
    try {
        const users = await Users.find(
            { "role": { $nin: ['admin'] } },
            {
                name: 1,
                phone: 1,
                account_status: 1,
                image: 1
            }
        ).exec()
        if (!users) {
            return res.status(204).json('Not available')
        }

        const response = {
            all_users: users.map(user => {
                if (user.image) {
                    return {
                        id: user.id,
                        name: user.name,
                        phone: user.phone,
                        account_status: user.account_status,
                        image: rootURl + "uploads/images/" + user.image,
                    }
                }

                return {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    account_status: user.account_status,
                    image: null,
                }

            })
        }
        res.status(200).json({ users: response.all_users })
    } catch (error) {
        next(error)
    }
}


// Update Account Status
const updateAccountStatus = async (req, res, next) => {
    let { id } = req.params
    let { account_status } = req.body
    try {
        const updateUser = await Users.findOneAndUpdate({ _id: id },
            { $set: { 'account_status': account_status } },
            { new: true })
            .exec()

        if (!updateUser) {
            return res.status(200).json({ message: "failed" })
        }
        res.status(200).json({ message: "success" })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


// Give Daimond
const giveDaimond = async (req, res, next) => {
    let { id } = req.params
    let { coin_amount } = req.body
    try {
        const userCoinUpdate = await Users.findOneAndUpdate(
            { _id: id },
            { $inc: { mainCoinBalane: coin_amount, presentCoinBalance: coin_amount } })
            .exec()

        if (!userCoinUpdate) {
            return res.json({ status: false, message: 'Coin give failed' })
        }

        res.json({ status: true, message: 'Coin give success.' })
    } catch (error) {
        if (error) {
            next(error)
        }
    }
}


module.exports = {
    allUsers,
    updateAccountStatus,
    giveDaimond
}