const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/userAuth");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
