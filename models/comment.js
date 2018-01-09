const mongoose = require('mongoose');

// The Comment Schema is similar to Article's
// The date is captured as a type=Date and Date.now when saved to the database
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