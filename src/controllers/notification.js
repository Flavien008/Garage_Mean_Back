const bcrypt = require('bcrypt');
const client = require("../db/connect");
const jwt = require('jsonwebtoken');
const { ObjectID } = require("bson");

const addNotification = async (req, res) => {
    try {
      let id_utilisateur = ObjectID(req.body.id_utilisateur);
      var title = req.body.title
      var message = req.body.message
      const filter = { _id: id_utilisateur };
      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: false };
      // create a document that sets the plot of the movie
      const updateDoc = {
        $push: { "notification": {"_id": new ObjectID(),"title":title,"message":message} }
        ,
      };
  
      let result = await client
        .db()
        .collection("utilisateurs")
        .updateOne(filter,updateDoc,options);
  
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    } 
  };

  module.exports = {
    addNotification
  };
  
