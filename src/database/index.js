import Sequelize from "sequelize";

//Configs
import dbConfig from "../config/database";

//Models
import Agendamento from "../models/Agendamento";
import Empresa from "../models/Empresa";
import Servico from "../models/Servico";
import User from "../models/User";

const connection = new Sequelize(dbConfig);

Agendamento.init(connection);
Empresa.init(connection);
Servico.init(connection);
User.init(connection);

Agendamento.associate(connection.models);
Empresa.associate(connection.models);
Servico.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
