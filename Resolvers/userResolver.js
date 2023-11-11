const User = require('../Models/userModel');

const userResolver = {
    Mutation: {
        registerUser: async (_, { name, email, profileUrl }) => {
          try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              throw new Error('User with this email already exists');
            }
    
            const newUser = new User({
              name,
              email,
              profileUrl,
            });
            console.log(newUser)
    
            await newUser.save();
    
            return newUser;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to register user');
          }
        },
     
       
    },

    Query:{
      getUser: async (_, { email })=>{

        try {
          const user = await User.findOne({ email });
          if(!user){
            throw new Error('User not found');
          }
         console.log("Here->");
          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch user by email');
        }

      }
    }
}

module.exports = userResolver;