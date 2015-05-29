'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.context == 'debug') {
		console.log('debug: ',request.message);	
	};
});