function signin(twitter_token, twitter_secret, callback) {
	$.ajax({
	    url: linkastor_url + '',
	    type: method,
	    data: 'auth_token=' + twitter_token + '&auth_secret=' + twitter_secret,
	    success: function (data) {
	        callback(data);
	    },
	    error: function() {
	    	callback('error');
	    }
	});
}