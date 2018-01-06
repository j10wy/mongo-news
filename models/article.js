const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	}
});

mongoose.connect('mongodb://localhost/gamespot');
let db = mongoose.connection;

db.on("error", function (error) {
	console.log(error);
});

db.on("open", function (error) {
	console.log("Connected to MongoDB");
	const Article = mongoose.model('Article', articleSchema);

	var gsNews = new Article({
		id: "1101-1111",
		img: "https://static.gamespot.com/uploads/screen_small/1579/15792183/3335024-maxresdefault.jpg",
		title: "Dragon Ball Z",
		date: Date.now(),
		text: "Here's the system requirements and pre-order info for the PC release of Dragon Ball FighterZ."
	});

	gsNews.save().then(function(news){
		console.log(news);
	})
});





//module.exports = articleSchema;