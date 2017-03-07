/* Hello World! program in Node.js */
console.log("Hello World!");

var FB     = require('fb'),
    Step   = require('step'),
    config = require('./config');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});

//    Step(
var accessToken = null;
function getAccessToken() {
    FB.napi('oauth/access_token', {
        client_id:      FB.options('appId'),
        client_secret:  FB.options('appSecret'),
        grant_type:     "client_credentials"
    }, function (err, result) {
        if(err) throw(err);
        var token = result.access_token;
	console.log("Token: " + token);
	accessToken = token;
    }
	   );
}
getAccessToken();

var parameters = {};
//parameters.access_token = accessToken;
parameters.access_token = FB.options('appId') + '|' + FB.options('appSecret');
FB.api('511363735542881/likes', 'get', parameters , function (result) {
    console.log(result);
    if(!result || result.error) {
	console.log("error: " + result);
        //return res.send(500, result || 'error');
        // return res.send(500, 'error');
    }
    
    //return res.redirect('/');
});

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
