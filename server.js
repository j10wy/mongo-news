const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/gamespot';
const PORT = process.env.PORT || 3000;
const app = express();

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
app.use("/", routes);

mongoose.connect(dbURL);
let db = mongoose.connection;

db.on("error", function (error) {
	console.log(error);
});

db.on("open", function () {
	console.log("Connected to MongoDB");
	app.listen(PORT);
});