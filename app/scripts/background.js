'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.context == 'debug') {
		console.log('debug: ',request.message);	
	};

	if (request.context == 'alert') {
		alert(request.message);
	};
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.indexOf(oauth_callback) > -1 && changeInfo.status == 'loading')
	{
		chrome.tabs.remove(tab.id);
		Oauth.access_token(tab.url, function(callback){
			Linkastor.sign_in(callback['oauth_token'],callback['oauth_token_secret'],function(success, error){
				if (error) 
				{
					alert('Something went wrong. Please try again');
				}
				else {
					Storage.saveUser(success);
					alert('Welcome ' + success.name + '\nPlease click on the extension again to share a link.');
				}
			});
		});
	}
});