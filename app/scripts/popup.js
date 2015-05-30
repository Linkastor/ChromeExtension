function setGroups(api_key){
	$("#group_selector").append("<option value='0'>--- SELECT A GROUP ---</option>");

	get_groups(api_key, function(groups){
		for (var i = 0 ; i < groups.length ; ++i)
		{
			 $("#group_selector").append("<option value='" + groups[i].id + "'>" + groups[i].name + "</option>");
		}	
	});
}

function fillForm(){
	chrome.tabs.query({'active':true, windowId:chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
		if (tabs.length > 0) {
			$("#share_title").val(tabs[0].title);
			$("#share_url").val(tabs[0].url);
		};
	})
}

$(function () {

	var current_user;

	getUser(function(user){
		if (user) {
			current_user = user;
			$('#share_container').show();
			setGroups(user.auth_token);
			fillForm();
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

	$("#share_form").submit(function(e) {
      e.preventDefault();

      if (!current_user) {
      	return;
      };

      if ($("#group_selector").val() == 0) {
      	return;
      };

      share_link($("#share_title").val(), $("#share_url").val(), $("#group_selector").val(), current_user.auth_token, function(callback){
      	window.close();
      })

    });
});