import { hash } from "bcryptjs";

const User = require("../models/User");

module.exports = {
  async index(request, response) {
    const users = await User.findAll();

    return response.json(users);
  },

  async store(request, response) {
    const { nome, sobrenome, email, password, empresaId } = request.body;

    const hashedPassword = await hash(password, 8);

    try {
      const user = await User.create({
        nome,
        sobrenome,
        email,
        password: hashedPassword,
        tipo: "funcionario",
        empresaId,
      });

      //Remove senha
      const userInfo = user.toJSON();
      delete userInfo.password;

      return response.json(userInfo);
    } catch (err) {
      return response.status(400).send({ error: err });
    }
  },

  async show(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.json(user);
  },

  async update(request, response) {
    const { user_id } = request.params;
    const { nome, email } = request.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    user.nome = nome;
    user.email = email;

    await user.save();

    return response.json(user);
  },

  async destroy(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    return response.json({ message: "User successfully deleted!" });
  },
};
