const Sequelize = require("sequelize");
// const dbConfig = require("../config/database");

const User = require("../models/User");
// const Task = require("../models/Task");

// const connection = new Sequelize(dbConfig);

//Banco, usuario, senha
const connection = new Sequelize("postgres", "postgres", "12345", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

User.init(connection);
// Task.init(connection);

// User.associate(connection.models);

module.exports = connection;
