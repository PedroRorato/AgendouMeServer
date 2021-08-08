const { verify } = require("jsonwebtoken");

const authConfig = require("../config/auth");

const verifyAuthentication = (request, response, next) => {
  //Validação do token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response
      .status(403)
      .json({ error: "Usuário não autenticado! No Header!" });
  }

  //Obter token
  const [, token] = authHeader.split(" ");

  console.log("Token: ", token);

  try {
    //Testa o token
    const decoded = verify(token, authConfig.jwt.secret);

    console.log(decoded.sub);

    request.userInfo = {
      id: decoded.sub,
    };

    return next();
  } catch (err) {
    console.log(err);
    return response
      .status(403)
      .json({ error: "Usuário não autenticado! Token Inválido!" });
  }
};

module.exports = verifyAuthentication;
