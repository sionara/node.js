const express = require("express"); // include express in this app
const path = require("path"); // module to help with file paths

const app = express();
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//SET UP PAGE ROUTES

// when there is get request to ROOT of my app, do something.
app.get("/", (request, response) => {
  response.status(200).send('Test Page');
  response.render("index");
});

// this listens for request for the about page
app.get("/about", (request, response) => {
  response.render("about");
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})