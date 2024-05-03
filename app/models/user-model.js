const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  ip: {
    type: String,
    required: false
  },
  isBanned: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema, "User");