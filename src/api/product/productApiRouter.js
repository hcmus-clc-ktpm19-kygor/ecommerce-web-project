const express = require("express");
const router = express.Router();

const controller = require("./productApiController");

router.get("/", controller.filterProducts);

module.exports = router;