function signin(twitter_token, twitter_secret, callback) {
	$.ajax({
	    url: linkastor_url + '/api/v1/users/sign_in',
	    type: 'POST',
	    data: 'auth_token=' + twitter_token + '&auth_secret=' + twitter_secret,
	    success: function (data) {
	        callback(data.user);
	    },
	    error: function() {
	    	callback('error');
	    }
	});
}

function get_groups(api_key, callback) {
	$.ajax({
	    url: linkastor_url + '/api/v1/groups?auth_token=' + api_key,
	    success: function (data) {
	        callback(data.groups);
	    },
	    error: function() {
	    	callback('error');
	    }
	});
}

function share_link(title, link, group_id, api_key, callback) {
	$.ajax({
	    url: linkastor_url + '/api/v1/groups/' + group_id + '/links',
	    type: 'POST',
	    data: 'auth_token=' + api_key + '&link[title]=' + title + '&link[url]=' + link,
	    success: function (data) {
	        callback(data.link);
	    },
	    error: function() {
	    	callback('error');
	    }
	});
}