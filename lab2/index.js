const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || "8888";

//server listening 

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// path to public folder

app.use(express.static(path.join(__dirname, "public")));

// pages
app.get("/", (request, response) => {
  response.render("index", {title: "Home"});
})