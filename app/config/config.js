var oauth_callback = 'http://localhost:666/callback/';
var oauth_consumer_key = 'NwA6HpLGxsDgFhUaWpvvIV8aQ';
var oauth_consumer_secret = 'BbsF9Bqb2sUz1h7KHyTTuIGSPLlAjuZDQ8otzvoYXQSjlbo22r';

var linkastor_url = 'https://linkastor.herokuapp.com';

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

var selected_group_id_key = 'com.linkastor.selected_group_id';

function setSelectedGroup(group_id) {
  var obj = {};
  obj[selected_group_id_key] = group_id;

  chrome.storage.local.set(obj);
}

function getSelectedGroup(callback) {
  chrome.storage.local.get(selected_group_id_key, function(items) {
    callback(items[selected_group_id_key]);
  });
}

var group_list_key = 'com.linkastor.groups';

function saveGroups(group_list) {
  var obj = {};
  obj[group_list_key] = group_list;

  chrome.storage.local.set(obj);
}

function getGroups(callback) {
  chrome.storage.local.get(group_list_key, function(items) {
    callback(items[group_list_key]);
  });
}