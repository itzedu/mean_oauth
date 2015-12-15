var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
		clientID: YOUR_APP_ID
		clientSecret: YOUR_SECRET_ID,
		callbackURL: "http://localhost:8000/auth/google/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		console.log(profile);
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


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});