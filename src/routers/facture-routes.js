const express = require("express");
const auth = require('../middleware/auth');
const {
  getFacture, paiement
} = require("../controllers/facture");
const router = express.Router();

router.route("/facture/:id").get(auth,getFacture);
router.route("/paiement").post(paiement);


module.exports = router;
