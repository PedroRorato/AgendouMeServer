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
        dia: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
            len: {
              args: [2, 50],
              msg: "Esse campo deve ter entre 2 e 50 caracteres",
            },
          },
        },
        horario: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: "empresaId", as: "empresa" });
    this.belongsTo(models.User, { foreignKey: "clienteId", as: "cliente" });
    this.belongsTo(models.User, {
      foreignKey: "funcionarioId",
      as: "funcionario",
    });
  }
}

module.exports = Agendamento;
