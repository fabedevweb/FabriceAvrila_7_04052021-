const express = require("express");
//Appel la méthode Router de Express
const router = express.Router();

//J'importe mon model de sauces
const thingCtrl = require("../controllers/thing");
//Importer le middleware qui protègera mes routes
//const auth = require("../middleware/auth");
//Importer le middleware multer
const multer = require("../middleware/multer-config");

router.post("/", multer, thingCtrl.thingimage);
module.exports = router;
