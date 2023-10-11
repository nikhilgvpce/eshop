const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbInstance");

const user = require("./routes/user.router");
const couse = require("./routes/course.router");

const multer = require("multer");

const upload = multer();

const app = express();

app.use(express.json())

app.use(cors());

dbConnection()

app.post('/register', (req, res) => {
  user.registerUser(req, res);
})

app.post('/createcourse', (req, res) => {
  couse.createCourse(req, res, upload)
})

app.post('/addtocart', (req, res) => {
  user.setCartItems(req, res);
})

app.post('/getcartitems', (req, res) => {
  user.getCartItems(req, res);
})

app.post('/checkout', (req, res) => {
  user.setOrders(req, res)
})

app.post("/login", (req, res) => {
  user.getUser(req, res)
})


app.listen(8080)




// app.get("/", async (req, res, next) => {
//   let client = res.locals.client;
//   try {
//     let collections = await getCollections(client);
//     if (collections.some((col) => col.name === "new_collection")) {
//       console.log("new_collection already exists");
//     } else {
//       collections = createCollection(client, 'new_collection');
//     }
//     res.json({ message: "Hello!!", collections });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   } finally {
//     // if (client) {
//     //   await client.close();
//     // }
//   }
// });


