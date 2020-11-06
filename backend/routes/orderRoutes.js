const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMware = require('../middleware/authMiddleware');

router.post('/' ,authMware.protect, orderController.addOrderItems);


module.exports = router;
