const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
	articleId: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);