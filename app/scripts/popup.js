$(function () {
	getUser(function(user){
		if (user) {
			$('#share_container').show();
		}
		else {
			$('#login_container').show();
		}
	})

	$('#login_link').click(function(){
		request_token(function(token){
			url = 'https://api.twitter.com/oauth/authenticate?' + token
			chrome.tabs.create({'url': url}, function(tab) {

			});
		});
		
	});
});