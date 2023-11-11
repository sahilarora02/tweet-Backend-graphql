const userSchema = `
 type User{
  id: ID!
  name: String!
  email: String!
  profileUrl: String
 }
 
 type Query {
  getUser(email:String): User
 }

 type Mutation {
   registerUser(name: String!, email: String!, profileUrl: String) : User
 }

`;
module.exports = userSchema;
