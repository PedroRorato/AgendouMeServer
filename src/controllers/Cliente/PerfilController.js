import { hash } from "bcryptjs";

import User from "../../models/User";

module.exports = {
  async update(request, response) {
    const session = request.session;

    const { nome, sobrenome, email } = request.body;
    const user = await User.findByPk(session.id);
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado!" });
    }

    user.nome = nome;
    user.sobrenome = sobrenome;
    user.email = email;
    await user.save();

    return response.json(user);
  },
};
