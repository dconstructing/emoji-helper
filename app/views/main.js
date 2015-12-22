var clipboard = require("nativescript-clipboard");

exports.loaded = function() {
	console.log('page loaded');
}

exports.buttonTapped = function(eventData) {
	console.log('button tapped', eventData.eventName, eventData.object, eventData.object.text);
	// put the emoji in the clipboard
	clipboard.setText(eventData.object.text).then(function() {
		console.log('OK, ' + eventData.object.text + ' copied to the clipboard');
	});
};
