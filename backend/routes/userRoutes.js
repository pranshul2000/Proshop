const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const authMware = require('../middleware/authMiddleware');
const { route } = require("./productRoutes");

router.post("/login", userController.authUser);
router.get('/profile', authMware.protect, userController.getUserProfile);
router.put('/profile', authMware.protect, userController.updateUserProfile);
router.get('/', authMware.protect ,authMware.admin, userController.getUsers);
router.post('/', userController.registerUser);
router.delete('/:id', authMware.protect, authMware.admin, userController.deleteUser );
router.get('/:id', authMware.protect, authMware.admin, userController.getUsersById);
router.put('/:id',  authMware.protect, authMware.admin, userController.updateUser);

module.exports = router;
