const express = require("express");
const router = express.Router();
const ChatModel = require("../models/chat-model.js");
const { get } = require("mongoose");
const verifyJWT = require("../middleware/verify-jwt.js");


router.get("/" ,verifyJWT, async (req, res) => {
    try {
    var data = await ChatModel.find({});
    
    res.status(201).send(data);
    } catch (err) {
        console.log(err)
        res.status(400).send({resp : err});
    }
    
});

router.post("/" ,verifyJWT, async (req, res) => {
    try {
        req.body.user = res.decoded.user
    var chatModel = new ChatModel(req.body);
    await chatModel.save();
    res.status(201).send(chatModel);
    } catch (err) {
        console.log(err)
        res.status(400).send({resp : err});
    }
    
});


module.exports = router;