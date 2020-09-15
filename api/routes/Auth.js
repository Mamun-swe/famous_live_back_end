const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/Auth')

router.post('/register', AuthControllers.Register)
router.post('/login', AuthControllers.Login)
router.get('/me', AuthControllers.MyInfo)
router.put('/logout', AuthControllers.Logout)

module.exports = router