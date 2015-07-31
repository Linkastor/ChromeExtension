function selectLastSelectedGroup(){
  Storage.getSelectedGroup(function(group_id){
    if (group_id > 0) {
      $("#group_selector").val(group_id);
    }
    else {
      $("#group_selector").val(0);
    }
  });
};

function setGroups(api_key){
	$("#group_selector").append("<option value='0'>--- SELECT A GROUP ---</option>");

  Storage.getGroups(function(storage_groups){
    for (var i = 0 ; i < storage_groups.length ; ++i)
    {
       $("#group_selector").append("<option value='" + storage_groups[i].id + "'>" + storage_groups[i].name + "</option>");
    }

    selectLastSelectedGroup();
  });

	Linkastor.get_groups(api_key, function(api_groups, error){
    if (error) {
      chrome.runtime.sendMessage({context: 'alert', message: 'Error while fetching the list of you groups. Please try again.'});
      Storage.clear(); 
    }
    else {
      $("#group_selector").empty();
      $("#group_selector").append("<option value='0'>--- SELECT A GROUP ---</option>");
      Storage.saveGroups(api_groups);
  		
      for (var i = 0 ; i < api_groups.length ; ++i)
      {
         $("#group_selector").append("<option value='" + api_groups[i].id + "'>" + api_groups[i].name + "</option>");
      }

      selectLastSelectedGroup();
    }
	});
}

function fillForm(){
	chrome.tabs.query({'active':true, windowId:chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
		if (tabs.length > 0) {
			$("#share_url").text(tabs[0].url);
			$("#share_title").val(tabs[0].title);
		};
	})
}

$(function () {

	var current_user;

	Storage.getUser(function(user){
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
		Oauth.request_token(function(token){
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
        $("#group_selector").css('background-color', '#FF0000');
      	return;
      };

      Linkastor.share_link($("#share_title").val(), $("#share_url").text(), $("#group_selector").val(), current_user.auth_token, function(success, error){
        if (error) {
          chrome.runtime.sendMessage({context: 'alert', message: 'Error while posting you link. Please try again.'});
        }
        
      	window.close();
      })

    });

  $("#open_linkastor").click(function(e){
    e.preventDefault();

    chrome.tabs.create({'url': linkastor_url + '/groups'}, function(tab) {

    });
  });

  $("#group_selector").on('change', function(){
    if (this.value > 0) {
      $("#group_selector").css('background-color', 'transparent');
      Storage.setSelectedGroup(this.value);
    };
    
  });

  $("#logout").click(function(e){
    e.preventDefault();
      Storage.clear(function(){
        window.close();
      });
      
  });
});