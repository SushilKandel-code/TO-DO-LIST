import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config({
  DB_HOST : process.env.DB_HOST,
  DB_PORT : process.env.DB_PORT,
  DB_DATABASE : process.env.DB_DATABASE,
  DB_USER : process.env.DB_USER,
  DB_PASSWORD: process.env.DB
}); 

const db = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});


if(db.connect()){
  console.log("Database Connected");
}else{
  console.error("Failed to connect Database ‼️");
}


let items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
