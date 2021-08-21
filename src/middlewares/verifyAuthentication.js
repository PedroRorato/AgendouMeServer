const { verify } = require("jsonwebtoken");

const authConfig = require("../config/auth");

const verifyAuthentication = (request, response, next) => {
  //Validação do token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.json({ error: "Usuário não autenticado! No Header!" });
  }

  //Obter token
  const [, token] = authHeader.split(" ");

  try {
    //Testa o token
    const decoded = verify(token, authConfig.jwt.secret);

    const { id, empresaId, isAdmin, tipo } = decoded.sessionData;

    request.session = {
      id,
      empresaId,
      isAdmin,
      tipo,
    };

    return next();
  } catch (err) {
    console.log(err);
    return response.json({ error: "Usuário não autenticado! Token Inválido!" });
  }
};

module.exports = verifyAuthentication;
