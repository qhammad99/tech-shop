const Product = require("../models/productModel");

// admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json({
    success: true,
    products,
  });
};

exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// admin
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// admin
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  // delete itselt- which we found
  await product.remove();

  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
};
