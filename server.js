const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('./models/article');
const gs = require('./controllers/gamespot-scraper');
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/gamespot';

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

app.get('/', function (req, res) {
	Article.find({}, (error, articles) => {
		res.render('home', {
			articles: articles
		});
	});

});

app.get('/scrape', function (req, res) {
	gs();
	res.send();
});

mongoose.connect(dbURL);
let db = mongoose.connection;

db.on("error", function (error) {
	console.log(error);
});

db.on("open", function () {
	console.log("Connected to MongoDB");
	app.listen(3000);
});