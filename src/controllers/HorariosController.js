import { hash } from "bcryptjs";

import User from "../models/User";

module.exports = {
  async show(request, response) {
    const session = request.session;

    const user = await User.findByPk(session.id);

    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado!" });
    }

    return response.json(user.horarios);
  },

  async update(request, response) {
    const session = request.session;

    console.log("foi");
    const { horarios } = request.body;
    const user = await User.findByPk(session.id);
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado!" });
    }

    user.horarios = horarios;
    await user.save();

    return response.json(user);
  },

  async destroy(request, response) {
    // const { user_id } = request.params;
    // const user = await User.findByPk(user_id);
    // if (!user) {
    //   return response.status(404).json({ error: "User not found" });
    // }
    // await user.destroy();
    // return response.json({ message: "User successfully deleted!" });
  },
};
