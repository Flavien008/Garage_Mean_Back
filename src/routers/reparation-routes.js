const express = require("express");
const auth = require('../middleware/auth');

const {
  ajouterDetails, findReparation
} = require("../controllers/reparation");
const router = express.Router();

router.route("/reparation/details").post(auth,ajouterDetails);
router.route("/reparation").get(findReparation);


module.exports = router;
