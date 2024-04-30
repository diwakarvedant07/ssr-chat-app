const express = require("express");
const router = express.Router();
const ChatModel = require("../models/chat-model.js");
const { get } = require("mongoose");


router.post("/" , async (req, res) => {
    try {
    var chatModel = new ChatModel(req.body);
    await chatModel.save();
    res.status(201).send(chatModel);
    } catch (err) {
        console.log(err)
        res.status(400).send({resp : err});
    }
    
});


module.exports = router;