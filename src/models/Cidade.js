const { Model, DataTypes } = require("sequelize");

class Cidade extends Model {
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
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Empresa, { foreignKey: "cidadeId", as: "empresas" });
  }
}

module.exports = Cidade;
