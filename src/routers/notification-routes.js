const express = require("express");
const auth = require('../middleware/auth');
const {
    addNotification
} = require("../controllers/notification");
const router = express.Router();
router.route("/notification").post(auth,addNotification);

module.exports = router;
