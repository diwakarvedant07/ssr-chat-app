const express = require("express");
const router = express.Router();
const UserModel = require("../models/user-model.js");
const { get } = require("mongoose");


router.post("/" , async (req, res) => {
    try {
    var userModel = new UserModel(req.body);
    await userModel.save();
    res.status(201).send(userModel);
    } catch (err) {
        console.log(err)
        res.status(400).send({resp : err});
    }
    
});

router.get("/checkIp/:ip" , async (req, res) => {
    var ip = req.params.ip
    try {
    var data = UserModel.findOne({ip : ip});
    res.status(201).send(data);
    } catch (err) {
        console.log(err)
        res.status(400).send({resp : err});
    }
    
});


module.exports = router;