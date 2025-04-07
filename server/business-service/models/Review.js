// server/business-service/models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  author: { type: String, required: true },  // Just a name or username
  text: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reply: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
