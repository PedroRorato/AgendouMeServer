const { Model, DataTypes } = require("sequelize");

class Empresa extends Model {
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
        endereco: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        foto: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: "empresaId", as: "funcionarios" });
    this.hasMany(models.Servico, { foreignKey: "empresaId", as: "servicos" });
    this.belongsTo(models.Cidade, { foreignKey: "cidadeId", as: "cidade" });
  }
}

module.exports = Empresa;
