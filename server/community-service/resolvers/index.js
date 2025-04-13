// server/community-service/resolvers/index.js
const News = require("../models/News");
const Discussion = require("../models/Discussion");
const HelpRequest = require("../models/HelpRequest");
const Reply = require("../models/Reply");
const Volunteer = require("../models/Volunteer");
const EmergencyAlert = require("../models/EmergencyAlert")

module.exports = {
  Query: {
    getNews: async () => {
      const newsItems = await News.find().sort({ createdAt: -1 });
      return newsItems.map(item => ({
        id: item._id.toString(),
        title: item.title,
        content: item.content,
        createdAt: item.createdAt.toISOString()
      }));
    },
    getDiscussions: async () => await Discussion.find().sort({ createdAt: -1 }),
    getHelpRequests: async () => await HelpRequest.find().sort({ createdAt: -1 }),
    getReplies: async (_, { discussionId }) => {
      return await Reply.find({ discussionId }).sort({ createdAt: 1 });
    },
    getVolunteers: async () => await Volunteer.find(),
    getEmergencyAlerts: async () => {
      return await EmergencyAlert.find();
    }
  },
  Mutation: {
    addNews: async (_, { title, content }) => {
      const news = new News({ title, content });
      return await news.save();
    },
    addDiscussion: async (_, { topic, message, author }) => {
      const discussion = new Discussion({ topic, message, author });
      return await discussion.save();
    },
    addHelpRequest: async (_, { title, description, category, postedBy }) => {
      const newRequest = new HelpRequest({ title, description, category, postedBy });
      return await newRequest.save();
    },
    addReply: async (_, { discussionId, author, message }) => {
      const reply = new Reply({ discussionId, author, message });
      return await reply.save();
    },
    createEmergencyAlert: async (_, { message }) => {
      const newEmergencyAlert = new EmergencyAlert({ message });
      await newEmergencyAlert.save();
      return newEmergencyAlert;
    },
    resolveEmergencyAlert: async (_, { id }) => {
      const emergencyAlert = await EmergencyAlert.findByIdAndUpdate(id, { resolved: true }, { new: true });
      return emergencyAlert;
    },
  }
};
