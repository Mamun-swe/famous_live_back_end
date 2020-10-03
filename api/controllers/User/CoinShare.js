const User = require('../../../models/users')
const checkId = require('../../middleware/mongooseId')
const jwt = require('jsonwebtoken')

const shareCoin = async (req, res, next) => {
    let { shareId, coinAmount } = req.body
    try {
        await checkId(shareId)

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const availableCoin = await User.findById({ _id: decode.id }, { presentCoinBalance: 1 }).exec()
        if (availableCoin.presentCoinBalance < coinAmount) {
            return res.json({ message: 'You do not have enough coins to share' })
        }

        const updateUserCoin = await User.findOneAndUpdate(
            { _id: shareId },
            { $inc: { presentCoinBalance: coinAmount } })
            .exec()

        const decrementMyCoin = await User.findOneAndUpdate(
            { _id: decode.id },
            { $inc: { presentCoinBalance: -coinAmount } })
            .exec()

        if (!updateUserCoin && !decrementMyCoin) {
            return res.json({ message: 'Coins were not shared' })
        }

        res.json({ message: `${coinAmount} Coin successfully shared` })

    } catch (error) {
        if (error) next(error)
    }
}


const updateCoin = async (req, res, next) => {
    let { coin } = req.body
    try {
        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        const userCoinUpdate = await User.findOneAndUpdate(
            { _id: decode.id },
            { $inc: { presentCoinBalance: coin } })
            .exec()

        if (!userCoinUpdate) {
            return res.json({ status: false, message: 'Coin update failed' })
        }

        res.json({ status: true, message: 'Successfully coin updated.' })

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    shareCoin,
    updateCoin
}