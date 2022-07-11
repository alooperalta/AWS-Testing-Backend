const express = require("express");
const router = express.Router();

//modules
const {test} = require("../controller/TEST");

router.get("/test", test);

module.exports = router;