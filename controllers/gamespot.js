const cheerio = require('cheerio');
const request = require('request');
const colors = require('colors');

request('https://www.gamespot.com/news', function (error, response, body) {

	// // Print the error if one occurred
	if (error) {

		console.log('ERROR!:'.underline.red);
		console.log(error);
		// @todo - respond to Express with error

	} else {

		// Print the response status code if a response was received
		console.log('statusCode:'.green, response.statusCode);

		// Store the response body in the htmlBody variable and load in Cheerio
		const htmlBody = body;
		const $ = cheerio.load(htmlBody);

		// Create a reference to the article links in the latest news section
		const articles = $('article.media.media-article');

		// Loop through each article - @todo - Update comment desdcription
		articles.each((index, element) => {

			let id = $(element).find('a.js-event-tracking').data('event-guid'),
				img = $(element).find('div.media-img.imgflare--river img').attr('src'),
				title = $(element).find('h3.media-title').text(),
				text = $(element).find('p.media-deck').text(),
				date = $(element).find('footer time.media-date').attr('datetime');
		});

	}

});