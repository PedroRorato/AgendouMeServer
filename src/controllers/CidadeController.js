import { hash } from "bcryptjs";

const Cidade = require("../models/Cidade");

module.exports = {
  async index(request, response) {
    const cidades = await Cidade.findAll();

    return response.json(cidades);
  },

  async store(request, response) {
    const { nome } = request.body;

    try {
      const cidade = await Cidade.create({ nome });

      return response.json(cidade);
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
    const { nome, preco, duracao, descricao, funcionarios } = request.body;

    const servico = await Servico.findByPk(servico_id);

    if (!servico) {
      return response.status(404).json({ error: "Serviço não encontrado" });
    }

    servico.nome = nome;
    servico.preco = preco;
    servico.duracao = duracao;
    servico.descricao = descricao;
    servico.funcionarios = funcionarios;

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
