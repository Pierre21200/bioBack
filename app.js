const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const infosRoutes = require("./routes/index.js");

mongoose
  .connect(
    "mongodb+srv://pierrepotin21:Titicaca21200@cluster0.7loclwk.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware CORS en premier
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(function (req, res, next) {
  // ... Vos autres middlewares de sécurité
  next();
});

app.use("/bioanimale/", infosRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.status(201);
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
  next();
});

module.exports = app;
