var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var path = require('path');
require('dotenv').config();
const axios = require('axios'); 

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


app.post('/send-sos', async (req, res) => {
	const { to, latitude, longitude } = req.body;
  
	const message = `🚨 SOS ALERT! 
  Location: https://maps.google.com/?q=${latitude},${longitude}`;
  
	try {
	  const response = await axios.post('https://textbelt.com/text', {
		phone: to.replace('+91', '91'), // removing "+" for Indian numbers
		message: message,
		key: 'textbelt' // free key for 1 SMS/day
	  });
  
	  console.log("Response from Textbelt:", response.data); // Log response for debugging
  
	  if (response.data.success) {
		res.status(200).json({ message: 'SMS sent successfully' });
	  } else {
		res.status(400).json({ message: 'Failed to send SMS', details: response.data });
	  }
	} catch (err) {
	  console.error('SMS send error:', err);
	  res.status(500).json({ message: 'Internal server error', details: err.message });
	}
  });


// Start server
app.listen(3000, function() {
  console.log("Safora ~(^_^)~");
  console.log("App Running on port 3000");
});





