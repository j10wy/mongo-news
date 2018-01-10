require("dotenv").config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
// Fallback to local DB when MONGODB_URI does not exist (basically anything outside of Heroju)
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/gamespot';
const PORT = process.env.PORT || 3000;
const app = express();

// Basix Express setup
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Load the app's routes
app.use("/", routes);

// Connect to MongoDB
mongoose.connect(dbURL);
let db = mongoose.connection;

// Display any database errors
db.on("error", function (error) {
	console.log(error);
});

// Start the server when successfully connected to the database
db.on("open", function () {
	console.log("Connected to MongoDB");
	app.listen(PORT);
});