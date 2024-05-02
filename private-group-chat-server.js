const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const requestIp = require('request-ip')
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const ejs = require('ejs')

const UserModel = require('./app/models/user-model.js');



// Set the view engine to EJS
app.set('view engine', 'ejs');

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
db.on("error", (error) => console.error("[ERROR]",error));
db.once("open", () => console.log("[DATABASE : CONNECTED]"));

// Define a route for the home page
app.get('/', async (req, res) => {
  
  var clientIp = await requestIp.getClientIp(req)
  
  clientIp = clientIp.split('f:')[1]

  try {
      var response = await UserModel.find({ip: `${clientIp}`})
      
      if(response.length == 0) {
        console.log("[REGISTER ROUTE]")
          return res.render('register', { ip: `${clientIp}` });
      }
      else {
        console.log("[INDEX ROUTE]")
        return res.render('index', { ip: `${clientIp}` });
      }
  } catch (err) {
      console.log(err.message)
  }

});

// const RegisterRouter = require("./app/routes/register-route.js");
// app.use("/register", RegisterRouter);


app.listen(5555, () => console.log("[SERVER : STARTED]"));
