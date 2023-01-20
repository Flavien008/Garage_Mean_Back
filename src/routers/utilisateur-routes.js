const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const utilisateurCtrl = require('../controllers/utilisateur');

router.post('/signup', utilisateurCtrl.signup);
router.post('/login', utilisateurCtrl.login);
router.route('/utilisateur/:id').get(auth,utilisateurCtrl.getUser);


module.exports = router;