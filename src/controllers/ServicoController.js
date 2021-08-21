import { hash } from "bcryptjs";

const Servico = require("../models/Servico");

module.exports = {
  async index(request, response) {
    const { empresaId } = request.session;
    const servicos = await Servico.findAll({
      where: {
        empresaId,
      },
    });

    return response.json(servicos);
  },

  async store(request, response) {
    const { empresaId } = request.session;
    console.log(request.body);
    const { nome, preco, duracao, description } = request.body;

    try {
      const servico = await Servico.create({
        nome,
        preco,
        duracao,
        description,
        empresaId,
      });

      return response.json(servico);
    } catch (err) {
      return response.status(400).send({ error: err });
    }
  },

  async show(request, response) {
    const { servico_id } = request.params;

    const user = await Servico.findByPk(servico_id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.json(user);
  },

  async update(request, response) {
    const { servico_id } = request.params;
    const { nome, email } = request.body;

    const user = await Servico.findByPk(servico_id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    user.nome = nome;
    user.email = email;

    await user.save();

    return response.json(user);
  },

  async destroy(request, response) {
    const { servico_id } = request.params;

    const user = await Servico.findByPk(servico_id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    return response.json({ message: "User successfully deleted!" });
  },
};
