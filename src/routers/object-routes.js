const express = require("express");
const auth = require('../middleware/auth');
const {
  addObject,
  getObject
} = require("../controllers/object");
const router = express.Router();

router.route("/object").post(auth,addObject);
router.route("/object/:tablename/:userId").get(auth,getObject);

module.exports = router;
