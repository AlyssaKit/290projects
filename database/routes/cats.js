var express = require("express");
var router = express.Router();

var catController = require("../Controllers/catController.js");

router.get("/", catController.catList);

router.get("/byname/:name", catController.catListByName);

router.get("/id/:id", catController.catById);

router.get("/create", catController.create);

router.get("/update/:id", catController.update_get);

router.post("/update/:id", catController.update_post);

module.exports = router;