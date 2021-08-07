import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

const User = require("../models/User");

const authConfig = require("../config/auth");

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    //Verifica se usuario foi encontrado
    if (!user) {
      return response.json({ error: "Email ou senha incorretos!" });
    }
    const userInfo = user.toJSON();
    const { name, tipo } = userInfo;

    //Testar password
    const passwordMatched = await compare(password, userInfo.password);
    if (!passwordMatched) {
      return response.json({ error: "Email ou senha incorretos!" });
    }

    //Configura JWT
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ name, tipo, email: userInfo.email }, secret, {
      subject: userInfo.id.toString(),
      expiresIn,
    });

    return response.json({ token });
  },

  async register(request, response) {
    //Cadastra empresa e usuario
    //Loga o usuario
    //
    // const { name, email } = request.body;
    // try {
    //   const user = await User.create({ name, email });
    //   return response.json(user);
    // } catch (err) {
    //   return response.status(400).send({ error: err });
    // }
  },
};
