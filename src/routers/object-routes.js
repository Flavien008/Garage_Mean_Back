const express = require("express");
const {
  addObject
} = require("../controllers/object");
const router = express.Router();

router.route("/object").post(addObject);

module.exports = router;
