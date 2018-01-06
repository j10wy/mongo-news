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

module.exports = mongoose.model('Article', articleSchema);