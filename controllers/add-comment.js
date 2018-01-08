const Comment = require("../models/comment");
const colors = require('colors');

function postComment(id, username, text, callback) {
	var newComment = new Comment({
		articleId: id,
		username: username,
		text: text
	});
	newComment.save().then(function(savedComment){
		callback(savedComment)
	});
}

module.exports = postComment;