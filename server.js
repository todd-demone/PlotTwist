// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const cookieSession = require('cookie-session');
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);
pool.connect();
const dbUsers = require('./db/usersDb')(pool);
const dbStories = require('./db/storiesDb')(pool);
const dbTwists = require('./db/twistsDb')(pool);
const dbVotes = require('./db/votesDb')(pool);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// Separated Routes for each Resource
const loginRoutes = require("./routes/loginRoutes");
const userRoutes = require("./routes/userRoutes.js")
const storiesRoutes = require("./routes/storiesRoutes");
const twistsRoutes = require("./routes/twistsRoutes");
const votesRoutes = require("./routes/votesRoutes");

// Mount all resource routes
app.use("/login", loginRoutes());
app.use("/api/users", userRoutes(dbUsers));
app.use("/api/stories", storiesRoutes(dbStories, dbTwists));
app.use("/api/twists", twistsRoutes(dbTwists));
app.use("/api/votes", votesRoutes(dbVotes));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
