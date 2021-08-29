const express = require("express");
const routes = express.Router();

//Middlewares
const verifyAuthentication = require("./middlewares/verifyAuthentication");

const CidadeController = require("./controllers/CidadeController");

//Controllers
const AuthController = require("./controllers/AuthController");

//Dashboard
const ContaController = require("./controllers/ContaController");
const EmpresaController = require("./controllers/EmpresaController");
const FuncionarioController = require("./controllers/FuncionarioController");
const HorariosController = require("./controllers/HorariosController");
const ServicoController = require("./controllers/ServicoController");
const UserController = require("./controllers/UserControler");

// ROTAS //

//
// Register
// Login
// ListaCidades
// ListagemEmpresa
// PagEmpresa
// PagFuncionarios
// PagAgenda
// Favoritos
// AgendamentosFuturos
// Perfil
// TrocarSenha

//Auth
routes.post("/login", AuthController.login);
routes.post("/register", AuthController.register);

//AUXILIARES
routes.get("/cidades", CidadeController.index);
routes.post("/cidades", CidadeController.store);

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
routes.get(
  "/dashboard/servicos",
  verifyAuthentication,
  ServicoController.index
);
routes.post(
  "/dashboard/servicos",
  verifyAuthentication,
  ServicoController.store
);
routes.get(
  "/dashboard/servicos/:servico_id",
  verifyAuthentication,
  ServicoController.show
);
routes.put(
  "/dashboard/servicos/:servico_id",
  verifyAuthentication,
  ServicoController.update
);
routes.delete(
  "/dashboard/servicos/:servico_id",
  verifyAuthentication,
  ServicoController.destroy
);

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
