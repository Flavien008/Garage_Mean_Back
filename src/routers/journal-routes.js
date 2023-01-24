const express = require("express");
const auth = require('../middleware/auth');
const {
  getJournal
} = require("../controllers/journal");
const router = express.Router();

router.route("/journals").get(auth,getJournal);


module.exports = router;