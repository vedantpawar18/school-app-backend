const jwt = require("jsonwebtoken");
require('dotenv').config()


const Authentification = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Login again ");
  }

  const user_token = req.headers.authorization;
  jwt.verify(user_token, process.env.JWT_SECRET, function (err, decode) {
    if (err) {
      return res.status(401).send("Login again invalid Credential ... ");
    }
   
    req.body.email = decode.email;
    req.body.userid = decode.userid;
    next();
  });
};

module.exports = Authentification;
