const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const followController = require('../controllers/User/Follow')

router.post('/follow', Authenticate.UserPermission, followController.makeFollow)

module.exports = router
