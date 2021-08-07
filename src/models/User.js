const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              msg: "Formato de email inválido, por favor confira o email informado!",
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
            async isUnique(value) {
              let user = await User.findOne({
                where: { email: value },
              });
              if (user) {
                throw new Error("Esse email já está sendo usado!");
              }
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
          },
        },
        tipo: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio",
            },
            len: {
              args: [2, 30],
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
    this.hasMany(models.Task, { foreignKey: "user_id", as: "tasks" });
  }
}

module.exports = User;
