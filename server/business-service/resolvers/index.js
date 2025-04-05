// server/business-service/resolvers/index.js
const Business = require("../models/Business");
const Deal = require("../models/Deal");
const Event = require("../models/Event");

module.exports = {
  Query: {
    getBusinesses: async () => await Business.find().sort({ createdAt: -1 }),
    getDeals: async () => await Deal.find().sort({ createdAt: -1 }),
    getEvents: async () => await Event.find().sort({ date: 1 })
  },

  Mutation: {
    addBusiness: async (_, { name, description, location, ownerId }) => {
      return await new Business({ name, description, location, ownerId }).save();
    },
    addDeal: async (_, { title, description, businessId, validUntil }) => {
      return await new Deal({ title, description, businessId, validUntil }).save();
    },
    addEvent: async (_, { title, description, location, date, organizerId }) => {
      return await new Event({ title, description, location, date, organizerId }).save();
    }
  }
};
