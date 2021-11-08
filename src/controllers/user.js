//J'importe le package de chiffrement bcrypt pour notre fonction signup
const bcrypt = require("bcrypt");
//J'importe mon package token
const jwt = require("jsonwebtoken");
var db = require("../../config/db.config");

exports.signup = (req, res, next) => {
  db.query(
    `SELECT * FROM utilisateur WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      {
        db.query(
          `INSERT INTO utilisateur (pseudo, email, password) VALUES ('${
            req.body.pseudo
          }','${req.body.email}',${db.escape(hash)})`,
          () => {
            return res.status(401).send({
              msg: "The user has been registerd with us!",
            });
          }
        );
      }
    })
  );
};

exports.login = (req, res, next) => {
  db.query(
    `SELECT * FROM utilisateur WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
          }
          if (bResult) {
            const token = jwt.sign(
              {
                email: result[0].email,
                password: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
};
exports.delete = (req, res, next) => {
  var sql = "DELETE FROM `utilisateur` WHERE `id`=?";
  db.query(sql, [req.params.id], function(error, results, fields) {
    if (error) throw error;
    return res.send({ message: "L'utilisateur a bien été supprimé" });
  });
};
