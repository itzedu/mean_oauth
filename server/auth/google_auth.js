var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");
var GoogleStrategy = require("passport-google").Strategy;

passport.use(new GoogleStrategy({
		returnURL: "http://localhost:8000/auth/google/return",
		realm: "http://localhost:8000/"
	},
	function(identifier, profile, done) {
		console.log(profile);
		User.findOne({ authId: profile.id }, function(err, user) {
			if(err) {
				console.log(err);
			} else {
				console.log(user);
			}
		})
		// User.findOne({ facebookId: profile.id }, function(err, user) {
		// 	if(err) {
		// 		return done(err);
		// 	}

		// 	if(!user) {
		// 		user = new User({
		// 			facebookId: profile.id,
		// 			name: profile.displayName,
		// 			provider: profile.provider,
		// 			facebook: profile._json
		// 		});
		// 		user.save(function(err) {
		// 			if(err) {
		// 				console.log(err)
		// 			}
		// 			return done(err, user);
		// 		});
		// 	} else {
		// 		return done(err, user);
		// 	}
		// })
	}
));