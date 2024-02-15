const express = require("express"); //include express in this app
const path = require("path"); //module to help with file paths
const { MongoClient, ObjectId } = require("mongodb"); // import MongoClient from mongodb

//DB values
const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const client = new MongoClient(dbUrl);

const app = express(); //create an Express app
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug"); //set up app to use Pug as template engine

//SET UP A PATH FOR STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//tells express how to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // t

//SET UP SOME PAGE ROUTES

//This shows the connection to db and fetch of data
app.get("/", async (request, response) => {
  
  let links = await getLinks();

  //response.status(200).send("Test page again"); //this is just to test
  response.render("index", { title: "Home", menu: links });
});

app.get("/about", async (request, response) => {
  let links = await getLinks();

  response.render("about", { title: "About", menu: links });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});

//Admin menu
app.get("/admin/menu", async (request, response) => {
  let links = await getLinks();
  response.render("menu-list", {title: "menu links admin", menu: links});
});

//receives get request to render add link form page
app.get("/admin/menu/add", async (request, response) => {
  let links = await getLinks();
  response.render("menu-add", {title: "Add menu link", menu: links});
});

//Admin form processing paths
app.post("/admin/menu/add/submit", async (request, response) => {
  //for POST data, retrieve field data using request.body.<fieldname>

  let wgt = request.body.weight;
  let path = request.body.path;
  let linkText = request.body.name;

  let newLink = { "weight": wgt, "path": path, "name": linkText};

  await addLink(newLink);
  response.redirect("/admin/menu"); // redirects to admin
});

//handles get request to delete link
app.get("/admin/menu/delete", async (request, response) => {
  //get linkId value in query string
  let id = request.query.linkId;
  //call delete fxn
  await deleteLink(id);
  //redirect to menu page
  response.redirect("/admin/menu");
})

//edit link
app.get("/admin/menu/edit", async (request, response) => {
  if(request.query.linkId) {
    let linkToEdit = await getSingleLink(request.query.linkId);
    let links = await getLinks();
    response.render("menu-edit", {title: "Edit menu link", menu: links, editLink: linkToEdit }); //renders pug page and passes these values into template
  } else {
    response.redirect("/admin/menu");
  }
});

//handle edit request
app.post("/admin/menu/edit/submit", async (request, response) => {
  //get filter JSON object
  let idFilter = { _id: new ObjectId(request.body.linkId)};

  let link = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };

  await editLink(idFilter, link);

  response.redirect("/admin/menu");
})

//create connection to db and retrieve data thru fxns
async function connection() {
  db = client.db();
  return db;
}

//fxn to select all documents in db
async function getLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({});
  res = await results.toArray();
  return res;
}

//fxn to insert one link
async function addLink(linkData){
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(linkData);
  console.log("Link added");
}

//delete link
async function deleteLink(id) {
  db = await connection();
  const deleteId = {_id: new ObjectId(id) };// changes query string value into ObjectId type
  const result = await db.collection("menuLinks").deleteOne(deleteId);
  
  if (result.deleteCount == 1) {
    console.log("delete successful");
  }
}

//get SINGLE link based on ID
async function getSingleLink(id) {
  db = await connection();
  const editId = { _id: new ObjectId(id) };
  const result = await db.collection("menuLinks").findOne(editId);
  return result
}

//edit link
async function editLink(filter, link) {
  db = await connection();
  //create the update set { $set: <JSON document> } 
  let updateSet = { $set: link};
  //execute an updateOne() to update the link as selected via the filter
  const result = await db.collection("menuLinks").updateOne(filter, updateSet);
  return result
}