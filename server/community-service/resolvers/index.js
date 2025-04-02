// server/community-service/resolvers/index.js

const { get } = require("mongoose");
const News = require("../models/News");
const Discussion = require("../models/Discussion");

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
    getDiscussions: async () => await Discussion.find().sort({ createdAt: -1 })
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
    }
  }
};