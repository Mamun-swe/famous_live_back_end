const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Authenticate')
const AuthControllers = require('../controllers/Auth')

router.post('/register', AuthControllers.Register)
router.post('/login', AuthControllers.Login)
router.get('/me', Authenticate.UserPermission, AuthControllers.MyInfo)
router.get('/logout', AuthControllers.Logout)

module.exports = router