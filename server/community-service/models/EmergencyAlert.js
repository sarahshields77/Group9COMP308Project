// server/community-service/models/EmergencyAlert.js

const mongoose = require('mongoose');

const EmergencyAlertSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EmergencyAlert', EmergencyAlertSchema);
