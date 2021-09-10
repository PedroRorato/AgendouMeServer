import { hash } from "bcryptjs";

const Servicos = require("../../models/Servicos");

module.exports = {
  async index(request, response) {
    const empresas = await Empresa.findAll({
      attributes: ["id", "nome", "endereco"],
    });

    return response.json(empresas);
  },
};
