const bcrypt = require('bcrypt');
const client = require("../db/connect");
const jwt = require('jsonwebtoken');
const { ObjectID } = require("bson");


exports.getUser = async (req, res) => {
  try {
    console.log('dzdea');
    let id = new ObjectID(req.params.id);
    let cursor = client.db().collection("utilisateurs").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "Cet utilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};


exports.signup = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password,1)
          .then(async hash => {
            req.body.password = hash
            let result = await client
          .db()
          .collection("utilisateurs")
          .insertOne(req.body);
          res.status(200).json(result);
          })
      } catch (error) {
        console.log(error);
        res.status(501).json(error);
      }
  };

  exports.login = async (req, res, next) => {
    try {
      let cursor = client.db().collection("utilisateurs").find({ login: req.body.login });
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
                        nom: result[0].nom,
                        role : result[0].role,
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