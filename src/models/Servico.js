const { Model, DataTypes } = require("sequelize");

class Servico extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        nome: {
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
        duracao: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
            len: {
              args: [1, 8],
              msg: "Dados incorretos.",
            },
          },
        },
        preco: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        funcionarios: {
          type: DataTypes.JSON,
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
    this.belongsToMany(models.User, {
      through: "servicosfuncionarios",
      as: "funcionario",
      foreignKey: "servicoid",
    });
  }
}

module.exports = Servico;
