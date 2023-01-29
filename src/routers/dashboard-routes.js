const express = require("express");
const auth = require('../middleware/auth');
const {
  benefice,statistique,getMoyenneReparationVoiture
} = require("../controllers/dashboard");
const router = express.Router();

router.route("/benefice").post(benefice);
router.route("/statistic").post(statistique);
router.route("/moyennevoiture").get(getMoyenneReparationVoiture);



module.exports = router;
