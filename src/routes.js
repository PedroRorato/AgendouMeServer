const express = require("express");
const routes = express.Router();

//Middlewares
const verifyAuthentication = require("./middlewares/verifyAuthentication");

//Controllers
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserControler");

// ROTAS //

//Auth
routes.post("/login", AuthController.login);
// routes.get("/users/:user_id", AuthController.show);
// routes.put("/users/:user_id", AuthController.update);
// routes.delete("/users/:user_id", AuthController.destroy);

//User
routes.get("/users", verifyAuthentication, UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:user_id", UserController.show);
routes.put("/users/:user_id", UserController.update);
routes.delete("/users/:user_id", UserController.destroy);

module.exports = routes;

//Ex multiplos middlewares
//routes.get("/users", [middleware.requireAuthentication, middleware.logger], UserController.index);
