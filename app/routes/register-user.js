const express = require("express");
const router = express.Router();
const UserModel = require("../models/user-model.js");
const { get } = require("mongoose");
const verifyJWT = require("../middleware/verify-jwt.js");
const verifyApiKey = require("../middleware/verify-api-key.js")
const jwt = require("jsonwebtoken");



router.post("/" ,verifyApiKey, async (req, res) => {
    try {
    var userModel = new UserModel(req.body);
    await userModel.save();
    res.status(201).send(userModel);
    } catch (err) {
        console.log(err)
        res.status(400).send({resp : err});
    }
    
});

router.get("/checkIp/:ip" ,verifyApiKey, async (req, res) => {
    var ip = req.params.ip
    try {
    var data = await UserModel.findOne({ip : ip});

    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    token = jwt.sign(
      {
        user: data.name,
        ip: data.ip,
        iat: currentTime,
        exp: currentTime + process.env.JWT_TOKEN_EXPIRY_TIME * 3600,
      },
      process.env.JWT_TOKEN_KEY
    );
    return res.status(201).send({ data: data, token: token });

    } catch (err) {
        console.log(err.stack)
        res.status(400).send({resp : err.stack});
    }
    
});


module.exports = router;