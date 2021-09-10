const Empresa = require("../../models/Empresa");

module.exports = {
  async index(request, response) {
    const empresas = await Empresa.findAll({
      attributes: ["id", "nome", "endereco", "foto"],
    });

    return response.json(empresas);
  },

  async show(request, response) {
    const { empresa_id } = request.params;

    const empresa = await Empresa.findByPk(empresa_id, {
      attributes: ["id", "nome", "endereco", "foto"],
      include: "servicos",
    });

    return response.json(empresa);
  },
};
