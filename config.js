
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:3000/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '238451816563745',
    appSecret:      process.env.FACEBOOK_APPSECRET      || 'c4e3973e5755d3648dd43d798c3ee1a6',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'playsign',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;
