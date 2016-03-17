chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('ui/status.html', {
		'outerBounds': {
			'width': 400,
			'height': 500
		}
	});
});