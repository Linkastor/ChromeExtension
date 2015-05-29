'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.context == 'debug') {
		console.log('debug: ',request.message);	
	};
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.indexOf(oauth_callback) > -1 && changeInfo.status == 'loading')
	{
		chrome.tabs.remove(tab.id);
		access_token(tab.url, function(callback){
			signin(callback['oauth_token'],callback['oauth_token_secret'],function(linkastor_callback){
				saveUser(linkastor_callback.user);
				alert('Welcome ' + linkastor_callback.user.name + '\nPlease click on the extension again to share a link.');
			});
		});
	}
});