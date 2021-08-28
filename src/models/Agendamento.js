const { Model, DataTypes } = require("sequelize");

class Agendamento extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        inicio: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        fim: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        info: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: "empresaId", as: "empresa" });
    this.belongsTo(models.Servico, { foreignKey: "servicoId", as: "servico" });
    this.belongsTo(models.User, { foreignKey: "clienteId", as: "cliente" });
    this.belongsTo(models.User, {
      foreignKey: "funcionarioId",
      as: "funcionario",
    });
  }
}

module.exports = Agendamento;
