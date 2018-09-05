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



// ROUTES 


app.get("/", function(req , res) {
	res.render("pages/index.ejs");
});

app.get("/new", function(req, res){
	res.render("pages/new.ejs")
});

app.post("/new", function(req, res){
	
})



app.listen(8080);
console.log("The server has been started");