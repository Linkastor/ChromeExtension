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

function oauth_header(method, url, token){
	var timestamp = Math.round(new Date()/1000);
	var nonce = '9cb227594dfbbd187143d0ade7ea77ea';

	var params = [{'key':'oauth_callback', 'value':oauth_callback},
	{'key':'oauth_consumer_key', 'value':oauth_consumer_key},
	{'key':'oauth_nonce', 'value':nonce},
	{'key':'oauth_signature_method', 'value':'HMAC-SHA1'},
	{'key':'oauth_timestamp', 'value':timestamp},
	{'key':'oauth_token', 'value':token},
	{'key':'oauth_version', 'value':'1.0'}];

	var concatParamsString = '';

	for (var i = 0 ; i < params.length ; ++i)
	{
		concatParamsString += params[i].key + '=' + params[i].value;
		if (i != params.length -1) {
			concatParamsString += '&';
		}
	}

	var signature = method + '&' + urlEncode(url) + '&' + urlEncode(concatParamsString);

	var hashKey = urlEncode(utf8Encode(oauth_consumer_secret)) + '&' + urlEncode(utf8Encode(token));

    var sig = b64_hmac_sha1(hashKey, signature);
    sig = urlEncode(sig + '=');

	var authString = 'OAuth ';

	for (var i = 0 ; i < params.length ; ++i)
	{
		authString += params[i].key + '="' + params[i].value + '", ';
	}

	authString += 'oauth_signature="' + sig + '"';

	return authString;
}

function request_token(callback) {
	method = 'POST';
	url = 'https://api.twitter.com/oauth/request_token';
	var authorization = oauth_header(method, url, '');

	$.ajax({
	    url: url,
	    type: method,
	    success: function (data) {
	        callback(data);
	    },
	    error: function() {
	    	callback('error');
	    },
	    beforeSend : function(req) {
	    	req.setRequestHeader('Authorization', authorization);
	    }
	});
}

function access_token(authorization_result,callback) {
	var results_params = getUrlParams(authorization_result);
	
	method = 'POST';
	url = 'https://api.twitter.com/oauth/access_token';
	var authorization = oauth_header(method, url, results_params['oauth_token']);

	$.ajax({
	    url: url,
	    type: method,
	    data: 'oauth_verifier=' + results_params['oauth_verifier'],
	    success: function (data) {
	        callback(getUrlParams(data));
	    },
	    error: function() {
	    	callback('error');
	    },
	    beforeSend : function(req) {
	    	req.setRequestHeader('Authorization', authorization);
	    }
	});
}