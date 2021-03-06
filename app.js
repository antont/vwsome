
var express       = require('express'),
    FB            = require('fb'),
    http          = require('http'),
    path          = require('path'),
    config        = require('./config');
//  home          = require('./routes/home');

var app = express();

if(!config.facebook.appId || !config.facebook.appSecret) {
    throw new Error('facebook appId and appSecret required in config.js');
}

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.cookieSession({ secret: 'secret'}));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

//var loginUrl = FB.getLoginUrl({ scope: 'user_about_me' });

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.send('hello world');
    var loginUrl = FB.getLoginUrl({ scope: 'user_about_me' });
    res.send('<a href="' + loginUrl + '">' + login + '</a>');
})

/*
app.get( '/',                home.index);
app.get( '/login/callback',  home.loginCallback);
app.get( '/logout',          home.logout);
app.get( '/friends',         api.friends);
*/

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
