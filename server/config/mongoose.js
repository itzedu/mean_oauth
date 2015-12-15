var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/fb_users");

var UserSchema = new mongoose.Schema({
	authId: Number,
	name: String,
	provider: String,
	facebook: Object
});

mongoose.model("User", UserSchema);