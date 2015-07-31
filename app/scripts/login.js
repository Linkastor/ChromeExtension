$(function () {
  $('#login_link').click(function(){
    Oauth.request_token(function(token){
      url = 'https://api.twitter.com/oauth/authenticate?' + token
      chrome.tabs.create({'url': url}, function(tab) {

      });
    });
    
  });
});