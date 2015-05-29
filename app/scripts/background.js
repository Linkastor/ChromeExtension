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
			console.log(callback);
		});
	}
});