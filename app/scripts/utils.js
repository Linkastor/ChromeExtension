function debug_log(msg) {   
  chrome.runtime.sendMessage({context: 'debug', message: msg});
};

function urlEncode(string)
{
  var urlString = '';

  for (var i = 0 ; i < string.length ; i++)
  {
    var chr = string.charCodeAt(i);

    if ((chr >= 48 && chr <= 57) || // 09
        (chr >= 65 && chr <= 90) || // AZ
        (chr >= 97 && chr <= 122) || // az
        chr == 45 || // -
        chr == 95 || // _
        chr == 46 || // .
        chr == 126) // ~
    {
      urlString += String.fromCharCode(chr);
    }
    else
    {
      urlString += '%' + chr.toString(16).toUpperCase();
    }
  }

  return urlString;
}

function utf8Encode(string)
{
  string = string.replace(/\r\n/g,'\n');
  var utfString = '';

  for (var i = 0 ; i < string.length ; i++)
  {
    var chr = string.charCodeAt(i);
    if (chr < 128)
    {
      utfString += String.fromCharCode(chr);
    }
    else if ((chr > 127) && (chr < 2048))
    {
      utfString += String.fromCharCode((chr >> 6) | 192);
      utfString += String.fromCharCode((chr & 63) | 128);
    }
    else
    {
      utfString += String.fromCharCode((chr >> 12) | 224);
      utfString += String.fromCharCode(((chr >> 6) & 63) | 128);
      utfString += String.fromCharCode((chr & 63) | 128);
    }
  }

  return utfString;
}

function getUrlParams(url) {
    var url = url + '';
    var url = url.split('#')[0] // Discard fragment identifier.
    var queryString = url.split('?')[1]
    if (!queryString) {
        if (url.search('=') !== false) {
            queryString = url
        }
    }
    var urlParams = {}
    if (queryString) {
        var keyValuePairs = queryString.split('&')
        for (var i = 0; i < keyValuePairs.length; i++) {
            var keyValuePair = keyValuePairs[i].split('=')
            var paramName = keyValuePair[0]
            var paramValue = keyValuePair[1] || ''
            urlParams[paramName] = decodeURIComponent(paramValue.replace(/\+/g, ' '))
        }
    }
    return urlParams
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() +
    s4() + s4() + s4() + s4();
}