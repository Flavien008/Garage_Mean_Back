const express = require("express");
const {
  ajouterDetails
} = require("../controllers/reparation");
const router = express.Router();

router.route("/reparation/details").post(auth,ajouterDetails);

module.exports = router;
