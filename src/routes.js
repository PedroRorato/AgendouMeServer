const express = require("express");
const routes = express.Router();

//Middlewares
const verifyAuthentication = require("./middlewares/verifyAuthentication");

const CidadeController = require("./controllers/CidadeController");

//Controllers Aplicativo
const AuthController = require("./controllers/AuthController");
const EmpresasController = require("./controllers/Cliente/EmpresasController");
const AgendaController = require("./controllers/Cliente/AgendaController");
const PerfilController = require("./controllers/Cliente/PerfilController");

//Dashboard: Controllers de Apoio
const ContaController = require("./controllers/ContaController");
const EmpresaController = require("./controllers/EmpresaController");
const FuncionarioController = require("./controllers/FuncionarioController");
const HorariosController = require("./controllers/HorariosController");
const ServicoController = require("./controllers/ServicoController");

// ROTAS //

//
// Register
// ListaCidades
//Empresa
routes.get("/empresas", EmpresasController.index);
routes.get("/empresas/:empresa_id", EmpresasController.show);
routes.get("/horarios-disponiveis", AgendaController.horariosDisponiveis);
routes.get("/agendamentos", AgendaController.agendamentos);
routes.put("/perfil", verifyAuthentication, PerfilController.update);

// Favoritos

// PagEmpresa
// PagFuncionarios
// PagAgenda

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
routes.get("/dashboard/servicos", ServicoController.index);
routes.post("/dashboard/servicos", ServicoController.store);
routes.get("/dashboard/servicos/:servico_id", ServicoController.show);
routes.put("/dashboard/servicos/:servico_id", ServicoController.update);
routes.delete("/dashboard/servicos/:servico_id", ServicoController.destroy);

//Funcionarios
routes.get("/dashboard/funcionarios", FuncionarioController.index);
routes.post("/dashboard/funcionarios", FuncionarioController.store);
routes.get("/dashboard/funcionarios/:user_id", FuncionarioController.show);
routes.put("/dashboard/funcionarios/:user_id", FuncionarioController.update);
routes.delete(
  "/dashboard/funcionarios/:user_id",
  FuncionarioController.destroy
);

module.exports = routes;

//Ex multiplos middlewares
//routes.get("/users", [middleware.requireAuthentication, middleware.logger], UserController.index);
