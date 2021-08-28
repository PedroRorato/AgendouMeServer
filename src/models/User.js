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
        sobrenome: {
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
        foto: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        horarios: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        favoritos: {
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
    this.belongsToMany(models.Servico, {
      through: "servicosfuncionarios",
      as: "servicos",
      foreignKey: "funcionarioid",
    });
  }
}

module.exports = User;
