const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');
const authMware = require('../middleware/authMiddleware');


router.get("/", productController.getProducts);
router.post("/",authMware.protect ,productController.createProduct);

router.get("/:id",productController.getProductById);
router.put("/:id",authMware.protect, productController.updateProduct);

router.delete('/:id', authMware.protect, productController.deleteProduct);

module.exports = router;
