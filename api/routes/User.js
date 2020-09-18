const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const AllUsersController = require('../controllers/User/AllUsers')
const followController = require('../controllers/User/Follow')
const profileController = require('../controllers/User/Profile')

router.get('/all-users', Authenticate.UserPermission, AllUsersController.getAllUsers)
router.post('/follow', Authenticate.UserPermission, followController.makeFollow)
router.get('/people-in-live', followController.liveFromFollowingList)
router.put('/update-profile-image/:id', Authenticate.UserPermission, profileController.updateProfileImage)

module.exports = router
