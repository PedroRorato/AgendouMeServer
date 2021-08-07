const express = require("express");
const cors = require("cors");
const routes = require("./routes");
//Start Database
require("./database");
//Start App
const app = express();
//Enable JSON
app.use(cors());
//Enable JSON
app.use(express.json());
//Routes
app.use(routes);
//Listener
app.listen(3333);

// (async () => {
//   const database = require("../database");
//   await database.sync();
// })();
