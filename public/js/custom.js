$(document).ready(function () {

	var username = null;

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

	scrapeButton.on("click", function name(event) {
		Materialize.toast('Fetching new stories!', 3000) ;
		$.get('/scrape', function name(results) {
			console.log(results);
		})
	});

	$(".comments").on("click", function(){
		var article_id = $(this).data("article-id");
		$("#comments").data("article-id",article_id);
	});

	$("button[type='submit']").on("click", function (event) {
		event.preventDefault();
		var name = $("#name").val(),
		comment = $("textarea#comment").val(),
		articleid = $("#comments").data("article-id");
		
		$.post('/insertComment', {
			name: name,
			comment: comment,
			articleid: articleid
		}).done(function(data){
			Materialize.toast('Comment posted!', 2000) ;
			$("#name").val("");
			$("textarea#comment").val("");
			$("a[href='#comments-tab']").trigger("click");
		});
	});

});