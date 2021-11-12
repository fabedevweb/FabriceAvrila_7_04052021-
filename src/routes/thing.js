const express = require("express");
//Appel la méthode Router de Express
const router = express.Router();

//J'importe mon model de sauces
const thingCtrl = require("../controllers/thing");
//Importer le middleware qui protègera mes routes
const auth = require("../middleware/auth");
//Importer le middleware multer
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, thingCtrl.createThing);
router.post("/reply", auth, thingCtrl.createReply);
router.get("/reply/:id", auth, thingCtrl.getReply);
router.delete("/reply/:id", auth, thingCtrl.deleteReply);
router.get("/:id", auth, thingCtrl.getOneThing);
router.get("/", thingCtrl.getAllThing);
router.put("/:id", auth, multer, thingCtrl.updateThing);
router.delete("/:id", auth, thingCtrl.deleteThing);
module.exports = router;
