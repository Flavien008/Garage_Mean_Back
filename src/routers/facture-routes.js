const express = require("express");
const auth = require('../middleware/auth');
const {
  getFacture
} = require("../controllers/facture");
const router = express.Router();

router.route("/facture/:id").get(getFacture);

module.exports = router;
