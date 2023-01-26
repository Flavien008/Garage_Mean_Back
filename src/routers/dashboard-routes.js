const express = require("express");
const auth = require('../middleware/auth');
const {
  benefice,statistique
} = require("../controllers/dashboard");
const router = express.Router();

router.route("/benefice").post(benefice);
router.route("/statistic").post(statistique);



module.exports = router;
