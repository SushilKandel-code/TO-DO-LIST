import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config(); 

const db = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "toDoList",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

if(db.connect()){
  console.log("Database Connected")
}else{
  console.error("Failed to connect Database ‼️");
}


let items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  }catch(error){
    console.error(`Error fetching data`, error)
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
    const result = await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
   res.redirect("/");
  }catch(error){
    console.error(`Error adding item`, error);
  }
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
