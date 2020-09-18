const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const followController = require('../controllers/User/Follow')
const profileController = require('../controllers/User/Profile')

router.post('/follow', Authenticate.UserPermission, followController.makeFollow)
router.put('/update-profile-image/:id', Authenticate.UserPermission, profileController.updateProfileImage)

module.exports = router
