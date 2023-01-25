const express = require("express");
const auth = require('../middleware/auth');
const {
  benefice
} = require("../controllers/dashboard");
const router = express.Router();

router.route("/benefice").post(benefice);


module.exports = router;
