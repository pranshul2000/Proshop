const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const authMware = require('../middleware/authMiddleware');

router.post("/login", userController.authUser);
router.get('/profile', authMware.protect, userController.getUserProfile);
router.post('/', userController.registerUser);

module.exports = router;
