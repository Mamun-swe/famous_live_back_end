const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const userController = require('../controllers/Admin/Users')

router.get('/users', Authenticate.AdminPermission, userController.allUsers)


module.exports = router