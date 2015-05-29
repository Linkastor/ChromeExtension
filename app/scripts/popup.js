'use strict';

function debug_log(msg) {
	chrome.runtime.sendMessage({context: 'debug', message: msg});
};

$(function () {
	$('#login_link').click(function(){
		request_token(function(token){
			url = 'https://api.twitter.com/oauth/authenticate?' + token
			chrome.tabs.create({'url': url}, function(tab) {

			});
		});
		
	});
});