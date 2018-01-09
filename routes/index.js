const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const addComment = require('../controllers/comments');
const gs = require('../controllers/gamespot-scraper');

router.get('/', function (req, res) {
	Article.find({}).sort({
		date: -1
	}).exec((err, articles) => {
		res.render('home', {
			articles: articles
		});
	});

});

router.post('/insertComment', function (req, res) {
	var body = req.body;
	addComment(body.articleid, body.name, body.comment, function(comment){
		res.send(comment);
	});
});

router.get('/scrape', function (req, res) {
	gs();
	res.send();
});

module.exports = router;