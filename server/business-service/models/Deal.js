// server/business-service/models/Deal.js
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: String,
  description: String,
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  validUntil: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Deal", dealSchema);
