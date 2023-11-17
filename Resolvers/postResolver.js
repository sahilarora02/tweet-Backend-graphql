const Post = require('../Models/postModel');

const postResolver = {
  Mutation: {
    createPost: async (_, { input }) => {
      try {
        const posts = [];

        for (let i = 0; i < input.posts.length; i++) {
          const postInput = input.posts[i];
          const newPost = new Post({
            content: postInput.content,
            user: postInput.userId,
            previousPost: i === 0 ? null : posts[i - 1].id,
          });

          const savedPost = await newPost.save();
          posts.push(savedPost);
        }

        return posts;
      } catch (error) {
        console.error(error);
        throw new Error('Failed');
      }
    },
  },
  Query: {
    getPost: async (_, { postId }) => {
      try {
        const thread = await Post.find({
          $or: [
            { _id: postId },
            { previousPost: postId },
          ],
        }).exec();

        return thread;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve thread');
      }
    },
  },
};

module.exports = postResolver;
