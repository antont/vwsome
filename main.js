/* Hello World! program in Node.js */
console.log("Hello World!");
console.log([].length)

var like_counts = {}; //the whole point of the code here is to get the like counts to here

var FB     = require('fb'),
//    Step   = require('step')
    config = require('./config');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});

//    Step(
//var accessToken = null;

var pending = 0; //desperate attempt to make waiting for completion simply

function getIDs(next) {
    var guids = ["194e85af-9ae7-4c35-8c7b-1ad4dc967144", "4c85a65e-5d93-496c-98f3-1fc3a4705d27", "646d257a-554a-4c45-8d11-5c19461a8e8c", "c018df45-8516-40ed-9faf-90efe1d15c75", "5936dd22-f953-4b22-a766-ac192fc58061"];
    var baseurl = "http://hiukkavaara3d.ouka.fi/vanhahiukkavaara/";
    var urls = guids.map(guid => baseurl + guid);
    var urlsstring = urls.join(","); //baseurl + "194e85af-9ae7-4c35-8c7b-1ad4dc967144",
    console.log(urls);
    var parameters = {
	//id: "http://www.google.com"
	ids: urlsstring
//	access_token: FB.options('appId') + '|' + FB.options('appSecret')
    }
    //parameters.access_token = accessToken;

    //Jeren tehokas test plan
    var obid = null;
    FB.api('/', 'get', parameters , function (result) {
	console.log("IDS - RESULT: %j", result);
	if(!result || result.error) {
	    console.log("error: " + result);
            //return res.send(500, result || 'error');
	} else {
	    guids.map(guid => {
		var url = baseurl + guid;
		var ogob = result[url].og_object;
		if (ogob) {
		    pending += 1;
		    next(guid, ogob.id);
		} else {
		    console.log("IDS - WARNING: no Open Graph object for URL %s", url);
		}
	    });
	    /*var data = result[urls[0]];
	    obid = data.og_object.id;
	    console.log("OG ID: " + obid);
	    next(obid);*/
	}
    });
}

function getData(guid, obid) {
    var parameters = {
	//id: "http://www.google.com",
	//id: "http://hiukkavaara3d.ouka.fi/vanhahiukkavaara/" + "194e85af-9ae7-4c35-8c7b-1ad4dc967144",
	//fields: "og_object,likes.summary(true).limit(0),share",
	
	//this works immediately without needing to fetch token:
	access_token: FB.options('appId') + '|' + FB.options('appSecret')
    }
    //parameters.access_token = accessToken;

    //test ob with more likes: 
    //var obid = "511363735542881"
    //Jeren tehokas test plan
    //var obid = "972670946171824";
    FB.api(obid + '/likes', 'get', parameters , function (result) {
    //FB.api('/', 'get', parameters , function (result) {
	console.log("LIKES RESULT: %j", result);
	if(!result || result.error) {
	    console.log("error: " + result);
            //return res.send(500, result || 'error');
            // return res.send(500, 'error');
	} else {
	    console.log(result.data);

	    //console.log([{}].length);
	    var count = result.data.length;
	    console.log("LIKE COUNT - " + guid + " : " + count);
	    like_counts[guid] = count;
	    pending -= 1;
	    if (pending == 0) {
		console.log("DONE!");
		uploadData();
	    }
	}
    
	//return res.redirect('/');
    });
    //http://graph.facebook.com/?fields=og_object%7Blikes.summary(true).limit(0)%7D,share&id=http://www.google.com
}

function uploadData() {
    console.log(like_counts);
}

getIDs(getData); //for simple version which does not need to fetch token - does fetch id now

/*
function getAccessToken(next) {
    FB.napi('oauth/access_token', {
        client_id:      FB.options('appId'),
        client_secret:  FB.options('appSecret'),
        grant_type:     "client_credentials"
    }, function (err, result) {
        if(err) throw(err);
        var token = result.access_token;
	console.log("Token: " + token);
	accessToken = token;
	next();
    }
	   );
}
getAccessToken(getData);*/


/*        },
        function extendAccessToken(err, result) {
            if(err) throw(err);
            FB.napi('oauth/access_token', {
                client_id:          FB.options('appId'),
                client_secret:      FB.options('appSecret'),
                grant_type:         'fb_exchange_token',
                fb_exchange_token:  result.access_token
            }, this);
        },
        function (err, result) {
            if(err) return err;

            req.session.access_token    = result.access_token;
            req.session.expires         = result.expires || 0;

            if(req.query.state) {
                var parameters              = JSON.parse(req.query.state);
                parameters.access_token     = req.session.access_token;

                console.log(parameters);
                return res.redirect('/');
            } else {
                return res.redirect('/');
            }
        }
    );*/

/*
FB.api('511363735542881/likes', 
       function (res) {
	   if(!res || res.error) {
	       console.log(!res ? 'error occurred' : res.error);
	       return;
	   }
	   console.log(res);
	   //console.log(res.name);
       });
*/

//says that requires access token
/*FB.api('4', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  console.log(res.id);
  console.log(res.name);
});*/

console.log(FB.getLoginUrl({ scope: 'user_about_me' }));

/* from a sample:
// Nearby Places
function getNearby() {
  // Check for and use cached data
  if (nearbyPlaces)
    return;

  logResponse("[getNearby] get nearby data.");

  // First use browser's geolocation API to obtain location
  navigator.geolocation.getCurrentPosition(function(location) {
    //curLocation = location;
    logResponse(location);

      $.ajax({
          url: '/search',
          data: {
              type: 'place',
              q: 'restaurant',
              center: location.coords.latitude + ',' + location.coords.longitude,
              distance: 1000,
              fields: 'id,name,picture'
          }
      }).success(function (response) {
          nearbyPlaces = response.data;
          logResponse(nearbyPlaces);
          displayPlaces(nearbyPlaces);
      }).error(function(err) {
          logResponse("Error fetching nearby place data.");
      });
  });
}

function displayPlaces(places) {
  // Places list
  logResponse("[displayPlaces] displaying nearby list.");
	var tmpl = $("#places_list_tmpl").html();
	var output = Mustache.to_html(tmpl, places);
	$("#places-list").html(output).listview('refresh');
}
*/

/* login stuffies
exports.index = function(req, res) {
    var accessToken = req.session.access_token;
    if(!accessToken) {
        res.render('index', {
            title: 'Express',
            loginUrl: FB.getLoginUrl({ scope: 'user_about_me' })
        });
    } else {
        res.render('menu');
    }
};

exports.loginCallback = function (req, res, next) {
    var code            = req.query.code;

    if(req.query.error) {
        // user might have disallowed the app
        return res.send('login-error ' + req.query.error_description);
    } else if(!code) {
        return res.redirect('/');
    }

    Step(
        function exchangeCodeForAccessToken() {
            FB.napi('oauth/access_token', {
                client_id:      FB.options('appId'),
                client_secret:  FB.options('appSecret'),
                redirect_uri:   FB.options('redirectUri'),
                code:           code
            }, this);
        },
        function extendAccessToken(err, result) {
            if(err) throw(err);
            FB.napi('oauth/access_token', {
                client_id:          FB.options('appId'),
                client_secret:      FB.options('appSecret'),
                grant_type:         'fb_exchange_token',
                fb_exchange_token:  result.access_token
            }, this);
        },
        function (err, result) {
            if(err) return next(err);

            req.session.access_token    = result.access_token;
            req.session.expires         = result.expires || 0;

            if(req.query.state) {
                var parameters              = JSON.parse(req.query.state);
                parameters.access_token     = req.session.access_token;

                console.log(parameters);

                FB.api('/me/' + config.facebook.appNamespace +':eat', 'post', parameters , function (result) {
                    console.log(result);
                    if(!result || result.error) {
                        return res.send(500, result || 'error');
                        // return res.send(500, 'error');
                    }

                    return res.redirect('/');
                });
            } else {
                return res.redirect('/');
            }
        }
    );
};

exports.logout = function (req, res) {
    req.session = null; // clear session
    res.redirect('/');
};
*/

/*
FB.getLoginUrl({
    scope: 'email,user_likes',
    redirect_uri: 'http://example.com/'
});
*/
