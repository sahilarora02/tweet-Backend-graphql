const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileUrl: String,
});

const User = mongoose.model('User', userModel);

module.exports = User;