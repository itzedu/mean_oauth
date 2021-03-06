var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
		clientID: YOUR_CLIENT_ID,
		clientSecret: YOUR_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
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