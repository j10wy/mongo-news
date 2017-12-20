$(document).ready(function () {

	// Initialize all modals.
	$('.modal').modal();

	let scrapeButton = $("nav a.btn.btn-floating");
	let scrapeIcon = scrapeButton.find("i");

	scrapeButton.hover(function () {
		// Add pulse effect to scrape button
		$(this).addClass("pulse appclr_neon_green");
	}, function () {
		// Remove pulse effect to scrape button
		$(this).removeClass("pulse appclr_neon_green");
	});

});