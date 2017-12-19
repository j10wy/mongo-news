$(document).ready(function () {

	let scrapeButton = $("nav a.btn.btn-floating");
	let scrapeIcon = scrapeButton.find("i");

	scrapeButton.hover(function () {
		// Add pulse effect to scrape button
		$(this).addClass("pulse");
		$(this).addClass("appclr_neon_green");
		scrapeIcon.addClass("appclr_black");
	}, function () {
		// Remove pulse effect to scrape button
		$(this).removeClass("pulse, appclr_neon_green");
		scrapeIcon.removeClass("appclr_black");
	});

});