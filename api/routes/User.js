const express = require('express')
const router = express.Router()
const followController = require('../controllers/User/Follow')

router.post('/follow', followController.UserFollow)
router.get('/users-follow/:id', followController.following)

module.exports = router
