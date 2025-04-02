const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  discussionId: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion", required: true },
  author: { type: String, default: "Anonymous" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reply", replySchema);
