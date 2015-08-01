var Background = {
  log: function(msg) {
    chrome.runtime.sendMessage({context: 'debug', message: msg});
  },

  alert: function(msg) {
    chrome.runtime.sendMessage({context: 'alert', message: msg});
  },

  share_link: function(title, link, group_id, api_key, callback) {
    var payload = { 'title' : title,
                    'link' : link,
                    'group_id' : group_id,
                    'api_key' : api_key
                  };
    chrome.runtime.sendMessage({context: 'background_post', message: payload});
    callback();
  }
};