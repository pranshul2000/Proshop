const asyncHnadler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc Create new order
// @route POST /api/orders
// @access  PriVate
module.exports.addOrderItems = asyncHnadler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
