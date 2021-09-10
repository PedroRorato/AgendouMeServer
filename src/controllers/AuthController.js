import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

//Config

import authConfig from "../config/auth";

//Models
import Empresa from "../models/Empresa";
import User from "../models/User";

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    console.log(request.body);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    //Verifica se usuario foi encontrado
    if (!user) {
      return response.json({ error: "Email ou senha incorretos!" });
    }
    const sessionData = user.toJSON();
    const { name, tipo, isAdmin } = sessionData;

    //Testar password
    const passwordMatched = await compare(password, sessionData.password);
    if (!passwordMatched) {
      return response.json({ error: "Email ou senha incorretos!" });
    }

    //Remove Password
    delete sessionData.password;
    delete sessionData.createdAt;
    delete sessionData.updatedAt;

    //Configura JWT
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ sessionData }, secret, {
      subject: sessionData.id.toString(),
      expiresIn,
    });

    return response.json({ token, sessionData });
  },

  async register(request, response) {
    const { empresa, nome, sobrenome, email, password, tipo } = request.body;

    let empresaId = null;
    let isAdmin = false;

    if (tipo === "funcionario") {
      //Cadastra empresa
      try {
        const empresaInfo = await Empresa.create({
          nome: empresa,
        });
        empresaId = empresaInfo.id;
        isAdmin = true;
      } catch (err) {
        return response.status(400).send({ error: err });
      }
    }

    //Cadastra usuario
    const hashedPassword = await hash(password, 8);
    try {
      const user = await User.create({
        nome,
        sobrenome,
        email,
        password: hashedPassword,
        tipo,
        isAdmin,
        empresaId,
      });

      //Login
      const sessionData = user.toJSON();
      //Remove Password
      delete sessionData.password;
      delete sessionData.createdAt;
      delete sessionData.updatedAt;

      //Configura JWT
      const { secret, expiresIn } = authConfig.jwt;
      const token = sign({ sessionData }, secret, {
        subject: sessionData.id.toString(),
        expiresIn,
      });

      return response.json({ token, sessionData });
    } catch (err) {
      return response.send({ error: err });
    }
  },
};
