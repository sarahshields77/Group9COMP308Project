// server/community-service/resolvers/index.js

const News = require("../models/News");

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
    }
  },
  Mutation: {
    addNews: async (_, { title, content }) => {
      const news = new News({ title, content });
      return await news.save();
    }
  }
};