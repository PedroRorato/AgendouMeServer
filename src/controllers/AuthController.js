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
    const { name, tipo, isAdmin } = userInfo;

    //Testar password
    const passwordMatched = await compare(password, userInfo.password);
    if (!passwordMatched) {
      return response.json({ error: "Email ou senha incorretos!" });
    }

    //Remove Password
    delete userInfo.password;
    delete userInfo.createdAt;
    delete userInfo.updatedAt;

    //Se for tipo == funcionario, carrega dados da empresa

    //Configura JWT
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ name, tipo, email: userInfo.email, isAdmin }, secret, {
      subject: userInfo.id.toString(),
      expiresIn,
    });

    return response.json({ token, userInfo });
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
      await User.create({
        nome,
        sobrenome,
        email,
        password: hashedPassword,
        tipo,
        isAdmin,
        empresaId,
      });

      return response.json({ msg: "Usuario cadastrado com sucesso!" });
    } catch (err) {
      return response.status(400).send({ error: err });
    }
  },
};
