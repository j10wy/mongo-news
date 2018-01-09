$(document).ready(function () {

	// Save the username, so it's prepolulated on after the user submits their first comment (clears with each session).
	var username = null;

	// Initialize all modals.
	$('.modal').modal();

	// Create reference to the scrape button and it's icon
	let scrapeButton = $("nav a.btn.btn-floating");
	let scrapeIcon = scrapeButton.find("i");

	// When the scrape button is hovered, add/remove the pulse and neon classes
	scrapeButton.hover(function () {
		// Add pulse effect to scrape button
		$(this).addClass("pulse appclr_neon_green");
	}, function () {
		// Remove pulse effect to scrape button
		$(this).removeClass("pulse appclr_neon_green");
	});

	// Display toast message when the scrape button is clicked
	scrapeButton.on("click", function name(event) {
		Materialize.toast('Fetching new stories!', 3000) ;
		// Send a request to the scrape route, which calls the GameSpot module
		$.get('/scrape', function name(results) {
			// Log whatever is returned from the server
			console.log(results);
		})
	});

	// Click handler for red comment buttons
	$(".comments").on("click", function(){
		// Create a reference to the article's id #
		var article_id = $(this).data("article-id");
		// Update the data-article-id attribute on the comment form
		$("#comments").data("article-id",article_id);
	});

	// Click handler to for comment form's submit button
	$("button[type='submit']").on("click", function (event) {
		// Prevent default form behavior
		event.preventDefault();
		// Store the user's name if not already cached above
		var name = username || $("#name").val(),
		// Store the user's comment and article ID #
		comment = $("textarea#comment").val(),
		articleid = $("#comments").data("article-id");
		
		// Make a request to the /insert-comment route
		$.post('/insert-comment', {
			name: name,
			comment: comment,
			articleid: articleid
		}).done(function(data){
			// When complete, display toast
			Materialize.toast('Comment posted!', 2000) ;
			// Clear name and comment fields
			$("#name").val("");
			$("textarea#comment").val("");
			// Return to comments tab
			$("a[href='#comments-tab']").trigger("click");
			// Update the username if it does not exist
			if (username === null) {
				username = name;
			}
		});
	});

});