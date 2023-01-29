const express = require("express");
const { sendMail } = require("../controllers/mail");
const auth = require('../middleware/auth');
const router = express.Router();

router.route("/sendmail").post(auth,sendMail); 

module.exports = router;

