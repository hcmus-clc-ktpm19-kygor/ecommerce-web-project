const express = require("express");
const router = express.Router();

const productController = require("./productController");

// GET Method
// Paging
router.get("/related-product", productController.getAll);
router.get("/api/related-product", productController.getRelatedProducts);
router.get("/", productController.paging);
// Get 1 product
router.get("/:id", productController.getProductById);

module.exports = router;
