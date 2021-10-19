var db = require("../../config/db.config");

exports.createThing = (req, res, next) => {
  const file = req.file;
  const comment = req.body.comment;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const likes = req.body.likes;
  const dislikes = req.body.dislikes;

  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  } else {
    db.query(
      `INSERT INTO post (comment, imageUrl, likes, dislikes) VALUES ('${comment}','${imageUrl}', '${likes}', '${dislikes}')`,
      function(err, result) {
        return res.send({ message: "File is successfully.", file });
      }
    );
  }
};
exports.getAllThing = (req, res, next) => {
  db.query("SELECT * FROM post", function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};
exports.getOneThing = (req, res, next) => {
  db.query("SELECT * FROM post WHERE id=?", req.params.id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};
exports.modifyThing = (req, res, next) => {
  const file = req.file;
  const comment = req.body.comment;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const likes = req.body.likes;
  const dislikes = req.body.dislikes;
  const id = req.params.id;

  var sql = `UPDATE post SET comment ='${comment}', imageUrl ='${imageUrl}', likes='${likes}', dislikes='${dislikes}'  WHERE id =${id} `;
  db.query(sql, function(error, results, fields) {
    if (error) throw error;
    return res.send({ message: "Le fichier a été modifié" });
  });
};
exports.deleteThing = (req, res, next) => {};
exports.likeThing = (req, res, next) => {};
