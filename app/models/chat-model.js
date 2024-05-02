const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required : false
  },
  message: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Chat", chatSchema, "Chat");