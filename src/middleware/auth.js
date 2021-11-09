const jwt = require("jsonwebtoken");
//Création du middleware qui protégera les routes
module.exports = (req, res, next) => {
  try {
    //Je récupère mon token dans le header renvoyé par le backend
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    //Je décode mon token pour ensuite y extraire le userId
    const decodedToken = jwt.verify(token, "SECRETKEY");
    console.log(decodedToken);
    //J'extraie le userId
    const userIdJwt = decodedToken.password;
    //console.log(userId);
    if (req.params.id && req.params.id !== userIdJwt) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
