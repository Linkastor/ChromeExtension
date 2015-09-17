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

	if (request.context == 'background_post') {
		 Linkastor.share_link(request.message.title, request.message.link, request.message.group_id, request.message.api_key, function(success, error){
        if (error) {
          Background.alert('Error while posting your link. Please log in again.');
          Storage.clear();
        }
      });
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.indexOf(oauth_callback) > -1 && changeInfo.status == 'loading')
	{
		chrome.tabs.remove(tab.id);
		Oauth.access_token(tab.url, function(callback){
			Linkastor.sign_in(callback['oauth_token'],callback['oauth_token_secret'],function(success, error){
				if (error) 
				{
					Background.alert('Something went wrong. Please try again');
				}
				else {
					Storage.saveUser(success);
					Background.alert('Welcome ' + success.name + '\nPlease click on the extension again to share a link.');
				}
			});
		});
	}
});
