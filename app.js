var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var path = require('path');
require('dotenv').config(); // Load .env

// Twilio Setup
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// Routes
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/tips", function(req, res) {
  res.render("seafty");
});

app.get("/maps", function(req, res) {
  res.sendFile(path.join(__dirname + '/MapAndLoc.html'));
});



// SOS route
app.post("/send-sos", async (req, res) => {
    const { latitude, longitude, to } = req.body;
  
    if (!latitude || !longitude || !to) {
      return res.json({ success: false, message: "Missing fields" });
    }

    console.log(`✅ reciver number ${to}`);

    const locationURL = `https://maps.google.com/?q=${latitude},${longitude}`;
    const msg = `🚨 Emergency! The user needs help. Location: ${locationURL}`;
  
    try {
      await client.messages.create({
        body: msg,
        from: process.env.TWILIO_PHONE, // Twilio verified sender number
        to: to,
      });
  
      console.log(`✅ SOS sent to ${to}`);
      res.json({ success: true });
    } catch (err) {
      console.error("❌ Error sending SMS:", err.message);
      res.json({ success: false });
    }
  });
  

// Start server
app.listen(3000, function() {
  console.log("Safora ~(^_^)~");
  console.log("App Running on port 3000");
});
