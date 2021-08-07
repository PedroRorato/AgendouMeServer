const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserControler");
// const TaskController = require('./controllers/TaskController');

// routes.get("/users", async (req, res) => {
//   res.json({ teste: "teste" });
// });

//User
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:user_id", UserController.show);
routes.put("/users/:user_id", UserController.update);
routes.delete("/users/:user_id", UserController.destroy);

// //Tasks
// routes.get("/tasks", TaskController.index);
// routes.post("/tasks", TaskController.store);
// routes.get("/tasks/:task_id", TaskController.show);
// routes.put("/tasks/:task_id", TaskController.update);
// routes.delete("/tasks/:task_id", TaskController.destroy);

module.exports = routes;
