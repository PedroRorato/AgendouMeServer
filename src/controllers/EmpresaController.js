import { hash } from "bcryptjs";

import Empresa from "../models/Empresa";

module.exports = {
  async show(request, response) {
    const session = request.session;

    const empresa = await Empresa.findByPk(session.id);

    if (!empresa) {
      return response.status(404).json({ error: "Empresa não encontrada!" });
    }

    return response.json(empresa);
  },

  async update(request, response) {
    const session = request.session;

    console.log(request.body);
    const { nome, descricao, endereco } = request.body;
    const empresa = await Empresa.findByPk(session.id);
    if (!empresa) {
      return response.status(404).json({ error: "Empresa não encontrada!" });
    }

    empresa.nome = nome;
    empresa.descricao = descricao;
    empresa.endereco = endereco;
    await empresa.save();

    return response.json(empresa);
  },
};
