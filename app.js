var express    = require("express"),
	methodOverride = require("method-override"),
	mongoose   = require("mongoose"),
	bodyParser = require("body-parser"),
	app        = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));

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
	DOB : Date,
})


var User = mongoose.model("user", userSchema);

// ROUTES 



app.get("/", function(req , res) {
		User.find({} ,function(err , user){
				if(err){
					console.log("Error");
					console.log(err);
				}else {
					res.render("pages/index.ejs" ,{user : user})
				};
	}); 
});

//Create Route
app.get("/new", function(req, res){
	res.render("pages/new.ejs")
});

app.post("/", function(req, res){
	var User = User.users.find({});
	console.log(User);
	var userobj = {
		name: req.body.name,
		gender: req.body.gender,
		class: req.body.class ,
		email : req.body.email,
		DOB : req.body.dob,
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
	
});

//Show Route

app.get("/:id", function(req , res) {
	User.findById( req.params.id  , function(err , user){
	if(err){
		res.redirect("/");
	}else {
		res.render("pages/show.ejs",{ user : user});
	}
	});
});



//Edit 
app.get("/:id/edit", function(req , res) {
	User.findById( req.params.id  , function(err , user){
		if(err){
			res.redirect("/");
		}else {
			res.render("pages/edit.ejs", { user : user})
		}
	});
})
app.put("/:id", function(req , res) {
	User.findByIdAndUpdate( {} , function(err , ){
		if(err){

		}else{

		}
	});
	res.redirect();
})

//UPDATE Route 
app.put("/:id", function(req, res){
	res.send("UPDATE");
});

app.delete("/:id", function(req , res) {
	User.findByIdAndRemove( {}  , function(err , ){
		if(err){

		}else{

		}
	});
	res.redirect();
})

app.listen(8080);
console.log("The server has been started at 8080");