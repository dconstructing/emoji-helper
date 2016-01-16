var clipboard = require('nativescript-clipboard');
var observableModule = require('data/observable');
var observableArrayModule = require('data/observable-array');
var view = require('ui/core/view');

var emojiSet = require('emojione/emoji_strategy.json');

var emojiArray = [];
for (var key in emojiSet) {
	emojiArray.push({
		value: String.fromCodePoint(parseInt(emojiSet[key].unicode, 16)),
		keywords: emojiSet[key].keywords.split(' ')
	});
}

var displayableEmojiList = new observableArrayModule.ObservableArray(emojiArray);

var pageData = new observableModule.Observable({
	emojiList: displayableEmojiList,
	query: ''
});

function copy(text) {
	clipboard.setText(text).then(function() {
		console.log('OK, ' + text + ' copied to the clipboard');
	});
}

function matches(emoji, text) {
	return emoji.keywords.some(function(keyword) {
		return keyword.includes(text);
	});
}

exports.loaded = function(args) {
	console.log('page loaded');
	page = args.object;
	page.bindingContext = pageData;
};

exports.queryChanged = function(eventData) {
	console.log('changed', eventData, eventData.object, eventData.object.text);
	displayableEmojiList.splice(0);
	emojiArray.forEach(function(emoji) {
		if (matches(emoji, eventData.object.text.toLowerCase())) {
			displayableEmojiList.push(emoji);
		}
	});
	console.log('length', displayableEmojiList.length);
}

exports.itemTap = function(eventData) {
	console.log('item tapped', eventData, eventData.object, eventData.index);
	copy(displayableEmojiList.getItem(eventData.index).value);
}
