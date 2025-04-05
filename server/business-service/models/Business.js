// server/business-service/models/Business.js
const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  ownerId: { type: String, required: true }, // user ID of the Business Owner
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Business", businessSchema);
