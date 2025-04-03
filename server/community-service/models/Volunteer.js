const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  type: String, // e.g., "Pet Care", "Gardening"
  contact: String,
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
