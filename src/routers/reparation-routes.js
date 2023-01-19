const express = require("express");
const auth = require('../middleware/auth');

const {
  ajouterDetails, findReparation, getReparationVoiture , getReparationVoitureByEtat
} = require("../controllers/reparation");
const router = express.Router();

router.route("/reparation/details").post(auth,ajouterDetails);
router.route("/reparation/:id").get(auth,getReparationVoiture);
router.route("/reparationbyid/:id").get(auth,findReparation);
router.route("/reparationbyetat/:etat").get(auth,getReparationVoitureByEtat);


module.exports = router;
