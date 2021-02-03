const asyncHnadler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc Fetch all products
// @route GET /api/proucts
// @access  Public
module.exports.getProducts = asyncHnadler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc Fetch a single product
// @route GET /api/proucts/:id
// @access  Public
module.exports.getProductById = asyncHnadler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "Product Not found",
    });
  }
});

// @desc delete a product
// @route GET /api/proucts/:id
// @access  Private/admin
module.exports.deleteProduct = asyncHnadler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();

    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404).json({
      message: "Product Not found",
    });
  }
});

// @desc Create a product
// @route POST /api/proucts/
// @access  Private/admin
module.exports.createProduct = asyncHnadler(async (req, res) => {
  const product = new Product({
    name: "Smaple name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Desc",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc UPDATE a product
// @route PUT /api/proucts/:id
// @access  Private/admin
module.exports.updateProduct = asyncHnadler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    image,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if(product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.countInStock = countInStock
    product.category = category

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }else{
    res.status(404);
    throw new Error('Product Not Found');
  }

  
});
