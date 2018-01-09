const Comment = require("../models/comment");
const colors = require('colors');

function postComment(id, username, text, callback) {
	// Create new comment using the Comment model.
	var newComment = new Comment({
		articleId: id,
		username: username,
		text: text
	});

	// Save the comment to the database 
	newComment.save().then(function(savedComment){
		callback(savedComment)
	});
}

module.exports = postComment;