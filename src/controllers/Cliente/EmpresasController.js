import { hash } from "bcryptjs";

const Empresa = require("../../models/Empresa");
const Servico = require("../../models/Servico");

module.exports = {
  async index(request, response) {
    const empresas = await Empresa.findAll({
      attributes: ["id", "nome", "endereco"],
    });

    return response.json(empresas);
  },

  async show(request, response) {
    const { empresa_id } = request.params;

    const empresa = await Empresa.findByPk(empresa_id, {
      attributes: ["id", "nome", "endereco"],
      include: "servicos",
    });

    console.log(empresa.getServicos());

    // empresas["servicos"] = servicos;

    return response.json(empresa);
  },
};
