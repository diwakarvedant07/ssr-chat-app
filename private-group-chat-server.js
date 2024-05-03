const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const requestIp = require('request-ip')
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const ejs = require('ejs')
const rateLimit = require('express-rate-limit');
// SOCKET
const http = require('http');
const socketIo = require('socket.io')
const server = http.createServer(app); // Create an HTTP server instance
const io = socketIo(server); // Pass the HTTP server instance to Socket.IO
const socketHandlers = require('./app/handlers/socket-handler')

const UserModel = require('./app/models/user-model.js');

// Define the rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 10 requests per windowMs
  handler: async function (req, res, next) {
    //console.log('Rate limit exceeded for:', req.ip);
    clientIp = req.ip.split('f:')[1]
    var data = await UserModel.findOne({ ip: clientIp })
    //console.log(data.isBanned)
    data.isBanned = false
    var updated = await data.save()
    // You can perform any action here, like logging or sending a response
    res.status(429).send({
      message: 'Abe Chut DDOS karna band kar , tumse na hoga',
      From: 'Pocket Chat Team'
    });
  }
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.use(limiter);

app.use(cors());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());


const UserChatRouter = require("./app/routes/user-chat.js");
app.use("/chat", UserChatRouter);

const UserRegisterRouter = require("./app/routes/register-user.js");
const { Console } = require("console");
app.use("/register", UserRegisterRouter);

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error("[ERROR]", error));
db.once("open", () => console.log("[DATABASE : CONNECTED]"));

// Socket.IO logic
//Socket Code
socketHandlers(io);

// Define a route for the home page
app.get('/', async (req, res) => {

  try {

    var clientIp = await requestIp.getClientIp(req)

    clientIp = clientIp.split('f:')[1]

    var response = await UserModel.find({ ip: `${clientIp}` })

    //   if(response[0].isBanned){
    //     return res.status(201).send({ message: "Bro you just got cancelled , Perma-Ban !!" });
    // }
    if (response.length == 0) {
      // console.log("New User Joining The Chat")
      // console.log("[REGISTER ROUTE]")
      return res.render('register', { ip: `${clientIp}` });
    }
    else {

      if (response[0].isBanned) {
        return res.status(201).send({ message: "Bro you just got cancelled , Perma-Ban !!" });
      }

       console.log(response[0].name, " Joined The Chat")
      // console.log("[INDEX ROUTE]")
      return res.render('index', {
        ip: `${clientIp}`,
        userName: response[0].name
      });
    }
  } catch (err) {
    console.log(err.message)
  }

});

app.get('/*', function (req, res) {
  res.redirect('/');
})

// const RegisterRouter = require("./app/routes/register-route.js");
// app.use("/register", RegisterRouter);


server.listen(5555, () => console.log("[SERVER : STARTED]"));
