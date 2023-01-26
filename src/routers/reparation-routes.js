const express = require("express");
const auth = require('../middleware/auth');

const {
  ajouterDetails, findReparation, getReparationVoiture ,facturerEtat, getReparationVoitureByEtat,updateEtat,setPrix,updateAvancement,updatedatedebut
} = require("../controllers/reparation");
const router = express.Router();

router.route("/reparation/details").post(auth,ajouterDetails);
router.route("/reparation/:id").get(auth,getReparationVoiture);
router.route("/reparationbyid/:id").get(auth,findReparation);
router.route("/reparationbyetat/:etat").get(auth,getReparationVoitureByEtat);
router.route("/updateetat/:id").post(auth,updateEtat);
router.route("/updatedatedebut/:id").post(auth,updatedatedebut);  
router.route("/reparation/prix").post(auth,setPrix);
router.route("/reparation/facturer/:id").get(auth,facturerEtat);
router.route("/reparation/avancer/:id").post(auth,updateAvancement);

module.exports = router;
