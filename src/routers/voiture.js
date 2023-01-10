const express = require("express");
const {
  ajouterVoiture,
  getVoitures,
  getVoiture,
  updateVoiture,
  deleteVoiture,
} = require("../controllers/Voiture");
const router = express.Router();

router.route("/voitures").post(ajouterVoiture);
router.route("/voitures").get(getVoitures);
router.route("/voitures/:id").get(getVoiture);
router.route("/voitures/:id").put(updateVoiture);
router.route("/voitures/:id").delete(deleteVoiture);

module.exports = router;
