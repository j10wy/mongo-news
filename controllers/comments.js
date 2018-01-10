const Comment = require("../models/comment");
const colors = require('colors');

const comments = {
	postComment: function postComment(id, username, text, callback) {
		// Create new comment using the Comment model.
		var newComment = new Comment({
			articleId: id,
			username: username,
			text: text
		});

		// Save the comment to the database 
		newComment.save().then(function (savedComment) {
			callback(savedComment)
		});
	},
	getComments: function getComments(articleid, callback) {
		Comment.find({
			articleId: articleid
		}).exec(function (error, commentData) {
			if (error) {
				console.log(error);
			} else {
				callback(commentData);
			}
		});
	}
}

module.exports = comments;