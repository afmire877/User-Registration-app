var express    = require("express"),
	mongoose   = require("mongoose"),
	bodyParser = require("body-parser"),
	app        = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));


//Mongoose setup
mongoose.connect("mongodb://localhost:27017/crud_app", {useNewUrlParser: true});
mongoose.connection.once("open", function(err){
	if(err){
		console.log("Error");
	}else{
		console.log("The connection to the DB has been made");
	}
})

// SCHEMA 

var userSchema = new mongoose.Schema({
	name: String,
	gender: String,
	class: String,
	email : String,
	DOB: Date,
})


var User = mongoose.model("user", userSchema);

// User.create({
// 	name: "Ahmed",
// 	gender: "male",
// 	class: "first",
// 	email : "email",
// 	DOB: "",
// })
// ROUTES 


app.get("/", function(req , res) {
	res.render("pages/index.ejs");
});

app.get("/new", function(req, res){
	res.render("pages/new.ejs")
});

app.post("/", function(req, res){
	console.log(req.body);
	var name = req.body.name;
	var Class = req.body.class;
	var gender = req.body.gender;
	var email = req.body.email;
	var dob = req.body.dob;
	var userobj = {
		name: name,
		gender: gender,
		class: Class ,
		email : email,
		DOB: dob,
	};
	User.create(userobj, function(err , user ) {
		if(err){
			console.log("error");
		}else {
			console.log("New user has been added");
			console.log(user);
		}
	} );
	res.redirect("/");
	
})



app.listen(8080);
console.log("The server has been started");