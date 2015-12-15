# MEAN-OAuth

OAuth 2.0 Google and Facebook user authentication using Passport (http://passportjs.org/)

## Setup

Register your application on Facebook's developers platform (https://developers.facebook.com) and on Google's developers console (https://console.developers.google.com)

Install passport, passport-facebook and passport-google-oauth

```
$ npm install passport
$ npm install passport-facebook
$ npm install passport-google-oauth
```

### Facebook

Upon registration, add your client_id and secret_id. You will need express to listen to the callback url in your routes.

```javascript
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
		clientID: YOUR_CLIENT_ID,
		clientSecret: YOUR_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		// User model from the mongo database. You may setup your model however you want
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					authId: profile.id,
					name: profile.displayName,
					provider: profile.provider,
					json_info: profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err)
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		})
	}
));
```

### Google

Upon registration, add your client_id and secret_id. You might have to enable Google+ API in the developers console depending on the scope that you set in the initial authentication request. You will need express to listen to the callback url in your routes.

```javascript
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
		clientID: YOUR_CLIENT_ID,
		clientSecret: YOUR_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/auth/google/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		// User model from the mongo database. You may setup your model however you want
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					authId: profile.id,
					name: profile.displayName,
					provider: profile.provider,
					json_info: profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err)
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		})
	}
));
```
