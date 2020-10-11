const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const DashboardController = require('../controllers/Admin/Dashboard')
const userController = require('../controllers/Admin/Users')

router.get('/dashboard', Authenticate.AdminPermission, DashboardController.countAllTypesUser)

router.get('/users', Authenticate.AdminPermission, userController.allUsers)
router.put('/user/:id/update-status', Authenticate.AdminPermission, userController.updateAccountStatus)
router.put('/user/:id/give-daimond', Authenticate.AdminPermission, userController.giveDaimond)

module.exports = router