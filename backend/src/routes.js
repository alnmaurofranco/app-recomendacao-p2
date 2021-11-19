const express = require("express");

const routes = express.Router();

const RecommendationController = require("./controllers/RecommendationController");

routes.post("/recommendations/create", RecommendationController.create);
routes.get("/recommendations/getAll", RecommendationController.getAll);

module.exports = routes;
