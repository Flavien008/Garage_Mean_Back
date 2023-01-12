const express = require("express");
const auth = require('../middleware/auth');

const {
  ajouterDetails
} = require("../controllers/reparation");
const router = express.Router();

router.route("/reparation/details").post(auth,ajouterDetails);

module.exports = router;
