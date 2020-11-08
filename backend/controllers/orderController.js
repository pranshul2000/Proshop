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

// @desc Get order by id
// @route GET /api/orders/:id
// @access  PriVate
module.exports.getOrderById = asyncHnadler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Update Order to Paid
// @route GET /api/orders/:id/pay
// @access  PriVate
module.exports.updateOrderToPaid = asyncHnadler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  GET logged in user orders
// @route GET /api/orders/myorders
// @access  Private
module.exports.getMyOrders = asyncHnadler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
