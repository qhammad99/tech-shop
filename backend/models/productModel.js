const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing Product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Missing Product description"],
  },
  price: {
    type: Number,
    required: [true, "Missing Product price"],
    maxLength: [8, "Max 8 digits allowed for price"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Missing Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Missing Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 charachers"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);