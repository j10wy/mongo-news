const Article = require("../models/article");
const cheerio = require('cheerio');
const request = require('request');
const colors = require('colors');

function getGameSpotNews(callback) {

	request('https://www.gamespot.com/news', function (error, response, body) {

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

			articles.each((index, element) => {

				let id = $(element).find('a.js-event-tracking').data('event-guid'),
					img = $(element).find('div.media-img.imgflare--river img').attr('src'),
					title = $(element).find('h3.media-title').text(),
					text = $(element).find('p.media-deck').text(),
					date = $(element).find('footer time.media-date').attr('datetime'),
					url = $(element).find('a.js-event-tracking').attr('href')

				var newWritcle = new Article({
					id: id,
					img: img,
					title: title,
					date: date,
					text: text,
					url: url
				});

				Article.find({
					id: id
				}, function (error, foundId) {

					if (error) {
						console.log(error);
					}

					if (foundId.length === 0) {
						newWritcle.save().then(function (savedArticle) {
							console.log("New article saved to database");
						});
					}
				});
				return true;
			});
		}
		
	});
}

module.exports = getGameSpotNews;