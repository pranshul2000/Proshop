const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMware = require('../middleware/authMiddleware');
const { route } = require("./productRoutes");

router.post('/' ,authMware.protect, orderController.addOrderItems);
router.get('/myorders', authMware.protect,  orderController.getMyOrders);
router.get('/:id', authMware.protect, orderController.getOrderById);
router.post('/:id/pay', authMware.protect, orderController.updateOrderToPaid);


module.exports = router;
