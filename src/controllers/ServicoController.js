import { hash } from "bcryptjs";

const Servico = require("../models/Servico");

module.exports = {
  async index(request, response) {
    const servicos = await Servico.findAll();

    return response.json(servicos);
  },

  async store(request, response) {
    const { nome, preco, duracao, descricao, funcionarios, empresaId } =
      request.body;
    console.log("funcionarios: ", funcionarios);

    try {
      const servico = await Servico.create({
        nome,
        preco,
        duracao,
        descricao,
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
