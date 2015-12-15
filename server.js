var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

var app = express();

app.use(express.static(path.join(__dirname + "/static")));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

// passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// database configuration
require("./server/config/mongoose.js");

// authentication
require("./server/auth/fb_auth.js");
require("./server/auth/google_auth.js")

// routing
require("./server/config/routes.js")(app);

app.listen(8000, function() {
	console.log("listening on port 8000");
})