//****************Je veux stocker les données utilisateurs*********************
//J'importe mongoose qui simplifie les tâches de lecture et d'écriture avec ma base de données Mongodb
/*
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Je crée un schéma pour définir les données que je souhaite stocker
const userSchema = mongoose.Schema({
  //unique est utilisé pour empêcher que deux utilisateurs ne partagent la même adresse mail
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
*/
var dbConn = require("../server.js");

var Utilisateur = function(utilisateur) {
  this.email = utilisateur.email;
  this.password = utilisateur.password;
};

// get all employees
Utilisateur.getAllEmployees = (result) => {
  dbConn.query(
    "INSERT INTO utilisateur SET ? ",
    employeeReqData,
    (err, res) => {
      if (err) {
        console.log("L'email existe peut-être déjà !");
        result(null, err);
      } else {
        console.log("Employé créé avec succès !");
        result(null, res);
      }
    }
  );
};
module.exports = Utilisateur;
