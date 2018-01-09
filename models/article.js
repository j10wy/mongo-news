const mongoose = require('mongoose');

// Article Schema
// Most if not all of the data is pulled from text on a page, so using the type of String when storing data.
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
	},
	url:{
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Article', articleSchema);