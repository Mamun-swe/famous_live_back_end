const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const DashboardController = require('../controllers/Admin/Dashboard')
const userController = require('../controllers/Admin/Users')

router.get('/dashboard', Authenticate.AdminPermission, DashboardController.countAllTypesUser)

router.get('/users', Authenticate.AdminPermission, userController.allUsers)
router.put('/user/:id/update-status', Authenticate.AdminPermission, userController.updateAccountStatus)
router.get('/users/name/update/requests', Authenticate.AdminPermission, userController.nameUpdateRequests)
router.put('/user/:id/update-name', Authenticate.AdminPermission, userController.nameUpdate)
router.put('/user/:id/give-coin', Authenticate.AdminPermission, userController.giveCoin)

module.exports = router