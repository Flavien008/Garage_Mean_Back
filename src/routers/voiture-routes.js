const express = require("express");
const auth = require('../middleware/auth');
const {
  ajouterVoiture,
  getVoitures,
  getVoiture,
  updateVoiture,
  deleteVoiture,
} = require("../controllers/Voiture");
const router = express.Router();

router.route("/voitures").post(auth,ajouterVoiture);
router.route("/voitures").get(auth,getVoitures);
router.route("/voitures/:id").get(auth,getVoiture);
router.route("/voitures/:id").put(auth,updateVoiture);
router.route("/voitures/:id").delete(auth,deleteVoiture);

module.exports = router;
