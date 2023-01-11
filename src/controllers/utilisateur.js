const bcrypt = require('bcrypt');
const Utilisateur = require("../model/utilisateur");
const client = require("../db/connect");
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password,1)
          .then(async hash => {
            const utilisateur = new Utilisateur({
              email: req.body.email,
              password: hash
            });
            console.log(utilisateur);
            let result = await client
          .db()
          .collection("utilisateurs")
          .insertOne(utilisateur);
          res.status(200).json(result);
          })
      } catch (error) {
        console.log(error);
        res.status(501).json(error);
      }
  };

  exports.login = async (req, res, next) => {
    try {
      let cursor = client.db().collection("utilisateurs").find({ email: req.body.email });
      let result = await cursor.toArray();
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: 'Mot de passe incorrecte' });
                        console.log("Tsy metyyy")
                    }else {
                      console.log("metyyyyy")
                       res.status(200).json({
                        userId: result[0]._id,
                        token: jwt.sign(
                          { userId: result[0]._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' }
                      )
                    });
                    }
                })
      } else {
        res.status(401).json({ msg: 'Identifiant inexistant' });
        console.log('tsy ato vee');
      }
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
 };