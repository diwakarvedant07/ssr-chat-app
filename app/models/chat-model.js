const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required : true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Chat", chatSchema, "Chat");