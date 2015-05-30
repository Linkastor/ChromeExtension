var oauth_callback = 'http://localhost:666/callback/';
var oauth_consumer_key = 'NwA6HpLGxsDgFhUaWpvvIV8aQ';
var oauth_consumer_secret = 'BbsF9Bqb2sUz1h7KHyTTuIGSPLlAjuZDQ8otzvoYXQSjlbo22r';

var linkastor_url = 'http://localhost:5000';

var user_storage_key = 'com.linkastor.user';

function saveUser(user) {
	var obj = {};
	obj[user_storage_key] = user;

	chrome.storage.local.set(obj);
}

function getUser(callback) {
	chrome.storage.local.get(user_storage_key, function(items) {
		callback(items[user_storage_key]);
	});
}