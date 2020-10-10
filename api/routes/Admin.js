const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const userController = require('../controllers/Admin/Users')

router.get('/users', userController.allUsers)
router.put('/user/:id/update-status', userController.updateAccountStatus)
router.get('/users/name/update/requests', userController.nameUpdateRequests)
router.put('/user/:id/update-name', userController.nameUpdate)


module.exports = router