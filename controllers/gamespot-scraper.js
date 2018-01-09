const Article = require("../models/article");
const cheerio = require('cheerio');
const request = require('request');
const colors = require('colors');

function getGameSpotNews(callback) {
	// URL and header options to pass to the request module
	var options = {
		url: 'https://www.gamespot.com/news',
		headers: {
			'user-agent': 'request'
		}
	}

	request(options, function (error, response, body) {

		//Print the error if one occurred
		if (error) {
			console.log('ERROR!:'.underline.red);
			console.log(error);

		} else {
			// Print the response status code if a response was received
			console.log('statusCode:'.green, response.statusCode);

			// Store the response body in the htmlBody variable and load in Cheerio
			const htmlBody = body;
			const $ = cheerio.load(htmlBody);

			// Create a reference to the article links in the latest news section
			const articles = $('article.media.media-article');

			// Loop through each of the articles in the 'latest news' section of gamespot.com.
			articles.each((index, element) => {

				// Each Gamespot article has an ID  on the anchor tag
				// Store the id, img path, title, body text and date
				let id = $(element).find('a.js-event-tracking').data('event-guid'),
					img = $(element).find('div.media-img.imgflare--river img').attr('src'),
					title = $(element).find('h3.media-title').text(),
					text = $(element).find('p.media-deck').text(),
					date = $(element).find('footer time.media-date').attr('datetime'),
					url = $(element).find('a.js-event-tracking').attr('href')

				// Check if the article ID exists in the database
				Article.find({
					id: id
				}, function (error, foundId) {
					// Log any errors during the database lookup
					if (error) {
						console.log(error);
					}

					// If the aricle does not exist in the database
					if (foundId.length === 0) {
						// Create new article object using the Article model
						var newAritcle = new Article({
							id: id,
							img: img,
							title: title,
							date: date,
							text: text,
							url: url
						});

						// Save the new article to the database
						newAritcle.save().then(function (savedArticle) {
							console.log("New article saved to database");
						});
					}
				});
				return true;
			});
			// Call the function passed in the routes file
			callback();
		}

	});
}

module.exports = getGameSpotNews;