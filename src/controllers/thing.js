var db = require("../../config/db.config");

exports.thingimage = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }
  var sql =
    "INSERT INTO `images`(`image_name`) VALUES (" + req.file.filename + ")";
  var query = db.query(sql, function(err, result) {
    return res.send({ message: "File is successfully.", file });
  });
};
