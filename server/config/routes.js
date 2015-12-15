var passport = require("passport");

module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("index");
	})

	app.get("/auth/facebook", passport.authenticate("facebook"));

	app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), function(req, res) {
		res.render("success", { user: req.session.passport.user });
	});

	app.get("/auth/google", passport.authenticate("google"));

	app.get("/auth/google/return", passport.authenticate("google", { failureRedirect: "/" }), function(req, res) {
		res.render("success", { user: req.session.passport.user });
	});
}