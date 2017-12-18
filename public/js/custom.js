$(document).ready(function () {

	let scrapeButton = $("nav a.btn.btn-floating");
	scrapeButton.hover(function () {
		// Add pulse effect to scrape button
		$(this).addClass("pulse");
	}, function () {
		// Remove pulse effect to scrape button
		$(this).removeClass("pulse");
	});

});