const express = require("express");
const auth = require('../middleware/auth');

const {
  ajouterDetails, findReparation, getReparationVoiture
} = require("../controllers/reparation");
const router = express.Router();

router.route("/reparation/details").post(auth,ajouterDetails);
router.route("/reparation/:id").get(auth,getReparationVoiture);


module.exports = router;
