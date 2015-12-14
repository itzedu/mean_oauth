var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

var app = express();

mongoose.connect("mongodb://localhost/fb_users");

var UserSchema = new mongoose.Schema({
	facebookId: Number,
	name: String
});

mongoose.model("User", UserSchema);

var User = mongoose.model("User");

app.use(express.static(path.join(__dirname + "/static")));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
		clientID: YOUR_APP_ID,
		clientSecret: YOUR_APP_SECRET_ID,
		callbackURL: "http://localhost:8000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({ facebookId: profile.id }, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				user = new User({
					facebookId: profile.id,
					name: profile.displayName
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
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/", function(req, res) {
	res.render("index");
})

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback", 
	passport.authenticate("facebook", { failureRedirect: "/" }),
	function(req, res) {
		res.render("success", { user: req.session.passport.user });
	});

app.listen(8000, function() {
	console.log("listening on port 8000");
})