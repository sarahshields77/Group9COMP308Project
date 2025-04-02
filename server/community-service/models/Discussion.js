// server/community-service/models/Discussion.js

const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Discussion", discussionSchema);
