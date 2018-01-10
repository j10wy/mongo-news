const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const comments = require('../controllers/comments');
const gs = require('../controllers/gamespot-scraper');

// Main page:
// Get articles, sort newest to oldest
// Return array of articles
router.get('/', function (req, res) {
	Article.find({}).sort({
		date: -1
	}).exec((err, articles) => {
		res.render('home', {
			articles: articles
		});
	});

});

// Insert Comment route:
// Inserts a comment into the Mongo DB.
// The post request is tied to the comment form and submitted via jQuery's $.post in the public/js/custom.js file
router.post('/insert-comment', function (req, res) {
	var body = req.body;
	comments.postComment(body.articleid, body.name, body.comment, function(comment){
		res.send(comment);
	});
});

// Scrap route:
// Works similar to /insertcomment
router.get('/scrape', function (req, res) {
	// Calls the Gamespot/GS module to scrape for new stories
	// The gs function takes a callback, which will call res.end() once the scrapper has completed inserting new articles into the database.
	gs(function(){
		res.end();
	});
	
});

// Get comments route
// Gets the comments for the article id specified.
router.get('/get-comments/:articleId', function(req, res) {
	let articleId = req.params.articleId;
	comments.getComments(articleId, function(commentData) {
		res.json(commentData);
	});
	
});

module.exports = router;