require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();
app.use(
  helmet({
    dnsPrefetchControl: false,
    contentSecurityPolicy: false,
  })
);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to mongoDb with mongoose
let uri = process.env.TRAVEL_MAP_MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const Schema = mongoose.Schema;
// Use the next four lines to see if you are conneted to mongoose correctly
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection Successful!");
});

// Set up models
const coordsSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});
const Coords = mongoose.model("Coords", coordsSchema);

const locationSchema = new Schema({
  location: { type: String, required: true },
  message: { type: String, required: true },
  recommendedBy: { type: String, required: true },
  coords: [coordsSchema], // Object with lat and lng
  iconImage: { type: String, required: true },
});
const Location = mongoose.model("Location", locationSchema);

// Handle form submit and add location to database
app.post("/new_location", (req, res) => {
  console.log(req.body, "<= req.body");

  // Use findByIdAndUpdate iconImage to green marker if someone marks it visited.
  let greenMarker = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  let redMarker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

  let newCoords = new Coords({
    lat: req.body.latitude,
    lng: req.body.longitude,
  });

  let location = new Location({
    location: req.body.location,
    message: req.body.message,
    recommendedBy: req.body.recommendedBy,
    coords: [newCoords],
    iconImage: redMarker,
  });

  location.save((error, savedLocation) => {
    if (error) return console.log(error);
    else {
      return res.redirect("/");
    }
  });
});

// get all of the locations inside database. Then use this route so client side index.js can use it to receive database data
app.get("/locations", (req, res) => {
  Location.find({}, (error, foundLocations) => {
    if (error) return console.log(error);
    else res.json(foundLocations);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
