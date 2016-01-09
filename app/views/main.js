var clipboard = require("nativescript-clipboard");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");

var emojiSet = require('emojione/emoji_strategy.json');

var emojiArray = [];
for (var key in emojiSet) {
	emojiArray.push({
		value: String.fromCharCode(parseInt(emojiSet[key].unicode, 16))
	});
}

var pageData = new observableModule.Observable({
	displayableEmojiList: new observableArrayModule.ObservableArray(emojiArray)
});

exports.loaded = function(args) {
	console.log('page loaded');
	page = args.object;
	page.bindingContext = pageData;
};

exports.buttonTapped = function(eventData) {
	console.log('button tapped', eventData.eventName, eventData.object, eventData.object.text);
	// put the emoji in the clipboard
	clipboard.setText(eventData.object.text).then(function() {
		console.log('OK, ' + eventData.object.text + ' copied to the clipboard');
	});
};
