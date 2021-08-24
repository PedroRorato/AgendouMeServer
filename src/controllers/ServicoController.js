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

    const servico = await Servico.findByPk(servico_id);

    if (!servico) {
      return response.status(404).json({ error: "Serviço não encontrado" });
    }

    return response.json(servico);
  },

  async update(request, response) {
    const { servico_id } = request.params;
    const { nome, preco, duracao, descricao } = request.body;

    const servico = await Servico.findByPk(servico_id);

    if (!servico) {
      return response.status(404).json({ error: "Serviço não encontrado" });
    }

    servico.nome = nome;
    servico.preco = preco;
    servico.duracao = duracao;
    servico.descricao = descricao;

    await servico.save();

    return response.json(servico);
  },

  async destroy(request, response) {
    const { servico_id } = request.params;

    const servico = await Servico.findByPk(servico_id);

    if (!servico) {
      return response.status(404).json({ error: "Serviço não encontrado" });
    }

    await servico.destroy();

    return response.json({ message: "Serviço excluído com sucesso!" });
  },
};
