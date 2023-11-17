const { gql } = require('apollo-server-express');

const postSchema = gql`
  type Post {
    id: ID!
    user: User!
    content: String!
    previousPost: Post
  }

  input CreatePostInput {
    posts: [PostInput!]!
  }

  input PostInput {
    content: String!
    userId: ID!
    previousPostId: ID
  }

  type Mutation {
    createPost(input: CreatePostInput!): [Post]
  }
  
  type Query {
    getPost(postId: ID!): [Post]
  }  
`;

module.exports = postSchema;
