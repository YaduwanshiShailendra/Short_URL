const express = require("express");
//const Url = require("../Model/url");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("index");
});
module.exports = router;
