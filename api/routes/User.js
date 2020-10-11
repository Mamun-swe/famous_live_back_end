const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const AllUsersController = require('../controllers/User/AllUsers')
const followController = require('../controllers/User/Follow')
const profileController = require('../controllers/User/Profile')
const coinShareController = require('../controllers/User/CoinShare')
const accountController = require('../controllers/User/Account')
const blockController = require('../controllers/User/BlockUser')
const liveController = require('../controllers/User/Live')

router.get('/all-users', Authenticate.UserPermission, AllUsersController.getAllUsers)
router.post('/follow', Authenticate.UserPermission, followController.makeFollow)
router.post('/unfollow', Authenticate.UserPermission, followController.unFollowUser)
router.put('/update-profile-image', Authenticate.UserPermission, profileController.updateProfileImage)

router.post('/share-coin', Authenticate.UserPermission, coinShareController.shareCoin)
router.put('/update-coin', Authenticate.UserPermission, coinShareController.updateCoin)

router.post('/name-change', Authenticate.UserPermission, accountController.nameUpdate)
router.delete('/delete-account', Authenticate.UserPermission, accountController.deleteMyAccount)

router.post('/block', Authenticate.UserPermission, blockController.blockUser)

router.put('/go-live', Authenticate.UserPermission, liveController.startLive)
router.put('/stop-live', Authenticate.UserPermission, liveController.closeLive)

module.exports = router
