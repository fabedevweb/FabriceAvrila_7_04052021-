const express = require("express");
const router = express.Router();
var db = require("../../config/db.config");
const employeeController = require("../controllers/employee.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// get all employees
router.get("/", employeeController.getEmployeeList);

// Créer un nouvel employé
//router.post("/", employeeController.createNewEmployee);
router.post("/register", (req, res, next) => {
  db.query(
    `SELECT * FROM utilisateur WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err) => {
      if (!req.body.email) {
        return res.status(409).send({
          msg: "This user is already in use!",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO utilisateur (email, password) VALUES ('${
                req.body.email
              }',${db.escape(hash)})`,
              (err) => {
                if (err) {
                  throw err;
                }
                return res.status(201).send({
                  msg: "The user has been registerd with us!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM utilisateur WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
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
              { id: result[0].id },
              "the-super-strong-secrect",
              { expiresIn: "1h" }
            );
            return res.status(40).send({
              msg: "Username or password is incorrect!",
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});
// update employee
router.put("/:id", employeeController.updateEmployee);

// delete employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
