var oauth_callback = 'http://localhost:666/callback/';
var oauth_consumer_key = 'kzqWOAo4EOMCb2uGPdihaHqjl';
var oauth_consumer_secret = 'WFANcJ7WgFXQL1J1oqJZZAqaagMNkl6OHcONKNPV4hAKLG7M4y';

var linkastor_url = 'http://linkastor.com';

var user_storage_key = 'com.linkastor.user';
var selected_group_id_key = 'com.linkastor.selected_group_id';
var group_list_key = 'com.linkastor.groups';

var Storage = {
  saveUser: function(user) {
  	var obj = {};
  	obj[user_storage_key] = user;

  	chrome.storage.local.set(obj);
  },

  getUser: function(callback) {
  	chrome.storage.local.get(user_storage_key, function(items) {
  		callback(items[user_storage_key]);
  	});
  },

  setSelectedGroup: function(group_id) {
    var obj = {};
    obj[selected_group_id_key] = group_id;

    chrome.storage.local.set(obj);
  },

  getSelectedGroup: function(callback) {
    chrome.storage.local.get(selected_group_id_key, function(items) {
      callback(items[selected_group_id_key]);
    });
  },

  saveGroups: function(group_list) {
    var obj = {};
    obj[group_list_key] = group_list;

    chrome.storage.local.set(obj);
  },

  getGroups: function(callback) {
    chrome.storage.local.get(group_list_key, function(items) {
      callback(items[group_list_key]);
    });
  },

  clear: function(callback) {
    Storage.saveUser(null);
    Storage.setSelectedGroup(null);
    Storage.saveGroups(null);
    callback();
  }
}