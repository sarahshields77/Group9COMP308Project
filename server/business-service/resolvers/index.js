// server/business-service/resolvers/index.js
const Business = require("../models/Business");
const Deal = require("../models/Deal");
const Event = require("../models/Event");
const Review = require("../models/Review");

module.exports = {
  Query: {
    getBusinesses: async () => await Business.find().sort({ createdAt: -1 }),
    getDeals: async (_, { businessId }) => {
      return await Deal.find({ businessId }).sort({ createdAt: -1 });
    },    
    getEvents: async () => await Event.find().sort({ date: 1 }),
    getReviews: async (_, { businessId }) => {
      return await Review.find({ businessId }).sort({ createdAt: -1 });
    }
  },

  Mutation: {
    addBusiness: async (_, { name, description, location, ownerId, imageUrl }) => {
      return await new Business({ name, description, location, ownerId, imageUrl }).save();
    },
    addDeal: async (_, { title, description, businessId, validUntil }) => {
      return await new Deal({ title, description, businessId, validUntil }).save();
    },
    addEvent: async (_, { id, title, description, location, date, organizerId }) => {
      if (id) {
        // 👇 Update existing event
        return await Event.findByIdAndUpdate(
          id,
          { title, description, location, date, organizerId },
          { new: true }
        );
      } else {
        // 👇 Create new event
        return await new Event({ title, description, location, date, organizerId }).save();
      }
    },
    addReview: async (_, { businessId, author, text, rating }) => {
      return await new Review({ businessId, author, text, rating }).save();
    },    
    replyToReview: async (_, { reviewId, reply }) => {
      return await Review.findByIdAndUpdate(
        reviewId,
        { reply },
        { new: true }
      );
    }    
  }
};
