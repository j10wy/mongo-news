const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gamespot');
let db = mongoose.connection;

db.on("error", function(error){
	console.log(error);
});

db.on("open", function(error){
	console.log("Connected to MongoDB");
});

const app = express();

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.render('home');
});

app.listen(3000);