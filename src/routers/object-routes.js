const express = require("express");
const auth = require('../middleware/auth');
const {
  addObject
} = require("../controllers/object");
const router = express.Router();

router.route("/object").post(auth,addObject);

module.exports = router;
