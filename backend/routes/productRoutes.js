const express = require("express");
const asyncHnadler = require("express-async-handler");
const router = express.Router();
const Product = require("../models/productModel");

// @desc Fetch all products
// @route GET /api/proucts
// @access  Public
router.get(
  "/",
  asyncHnadler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);


// @desc Fetch a single product
// @route GET /api/proucts/:id
// @access  Public

router.get(
  "/:id",
  asyncHnadler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product Not found",
      });
    }
  })
);

module.exports = router;
