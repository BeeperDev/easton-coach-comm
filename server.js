const express = require("express"); // require express package
const app = express(); // this is where we're using express
const mongoose = require("mongoose"); // requires the db usage
const passport = require("passport"); // different strategies for types logins
const session = require("express-session"); // uses cookies so we stay logged in & know if user is logged in
const MongoStore = require("connect-mongo")(session); // storing session in db so if you leave browser, you can stay logged in
const methodOverride = require("method-override"); // handles PUTS in forms
const flash = require("express-flash"); // shows us the alert notifications
const logger = require("morgan"); // shows routes in console
const connectDB = require("./config/database"); // connect to db
const mainRoutes = require("./routes/main"); // links to routes
const postRoutes = require("./routes/posts");
const studentRoutes = require("./routes/student");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport); // passing (passport) into this require function

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing to pull stuff out of the req stuff we pass in
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method")); // all POSTS that come in, look for _method query param, override with the alternative passed with it

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/student", studentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
