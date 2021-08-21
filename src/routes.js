const express = require("express");
const routes = express.Router();

//Middlewares
const verifyAuthentication = require("./middlewares/verifyAuthentication");

//Controllers
const AuthController = require("./controllers/AuthController");
const ContaController = require("./controllers/ContaController");
const EmpresaController = require("./controllers/EmpresaController");
const FuncionarioController = require("./controllers/FuncionarioController");
const HorariosController = require("./controllers/HorariosController");
const UserController = require("./controllers/UserControler");

// ROTAS //

//Auth
routes.post("/login", AuthController.login);
routes.post("/register", AuthController.register);

//Conta
routes.get("/dashboard/conta", verifyAuthentication, ContaController.show);
routes.put("/dashboard/conta", verifyAuthentication, ContaController.update);

//Horarios
routes.get(
  "/dashboard/horarios",
  verifyAuthentication,
  HorariosController.show
);
routes.put(
  "/dashboard/horarios",
  verifyAuthentication,
  HorariosController.update
);

//Perfil Empresa
routes.get(
  "/dashboard/perfil-empresa",
  verifyAuthentication,
  EmpresaController.show
);
routes.put(
  "/dashboard/perfil-empresa",
  verifyAuthentication,
  EmpresaController.update
);

//Servicos
routes.get("/dashboard/servicos", verifyAuthentication, UserController.index);
routes.post("/dashboard/servicos", UserController.store);
routes.get("/dashboard/servicos/:user_id", UserController.show);
routes.put("/dashboard/servicos/:user_id", UserController.update);
routes.delete("/dashboard/servicos/:user_id", UserController.destroy);

//Funcionarios
routes.get(
  "/dashboard/funcionarios",
  verifyAuthentication,
  FuncionarioController.index
);
routes.post(
  "/dashboard/funcionarios",
  verifyAuthentication,
  FuncionarioController.store
);
routes.get(
  "/dashboard/funcionarios/:user_id",
  verifyAuthentication,
  FuncionarioController.show
);
routes.put(
  "/dashboard/funcionarios/:user_id",
  verifyAuthentication,
  FuncionarioController.update
);
routes.delete(
  "/dashboard/funcionarios/:user_id",
  verifyAuthentication,
  FuncionarioController.destroy
);

module.exports = routes;

//Ex multiplos middlewares
//routes.get("/users", [middleware.requireAuthentication, middleware.logger], UserController.index);
