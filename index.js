const express = require("express");
const bodyParser = require("body-parser");
// Path permet à l'API de savoir ou se trouve les images à récupérer
const path = require("path");
// import employee routes
const userRoutes = require("./src/routes/user");
const thingRoutes = require("./src/routes/thing");
// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// parse request data content type application/x-www-form-rulencoded
//pp.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

//Importer les images
// Path permet à l'API de savoir ou se trouve les images à récupérer
app.use("images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api", thingRoutes);
// listen to the port
app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
});

module.exports = app;
