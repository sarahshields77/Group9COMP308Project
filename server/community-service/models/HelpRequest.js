// server/community-service/models/HelpRequest.js

const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  postedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
