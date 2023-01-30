const express = require("express");
const auth = require('../middleware/auth');
const {
  benefice,statistique,getMoyenneReparationVoiture
} = require("../controllers/dashboard");
const router = express.Router();

router.route("/benefice").post(benefice);
router.route("/statistic").post(statistique);
router.route("/moyennevoiture").post(getMoyenneReparationVoiture);



module.exports = router;
