const jwt = require("jsonwebtoken");
//Création du middleware qui protégera les routes
module.exports = (req, res, next) => {
  try {
    //Je récupère mon token dans le header renvoyé par le backend
    const token = req.headers.authorization.split(" ")[1];
    //Je décode mon token pour ensuite y extraire le userId
    const decodedToken = jwt.verify(token, "SECRETKEY");
    console.log(decodedToken);
    //J'extraie le userId
    const userId = decodedToken.id;
    console.log(userId);
    if (req.body.userId && req.body.userId != userId) {
      console.log("MAUVAIS");
      throw "Invalid user ID";
    } else {
      console.log("OK YES TOP");
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

/*
function authentication(req, res, next) {
    const header = req.headers["Authorization"];
    const token = header && header.split("")[1];
    if (!token) {
      return res.sendstatus(401);
    }
    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendstatus(401);
      }
      req.user = user;
      next();
    });
  }
  */
