const { ObjectID } = require("bson");
const client = require("../db/connect");

const ajouterDetails = async (req, res) => {
  try {
        let id_reparation = ObjectID(req.body.id_reparation);
        var designation = req.body.designation
        var prix = req.body.prix
        var avancement = 0

        const filter = { _id: id_reparation };
        // this option instructs the method to create a document if no documents match the filter
        const options = { upsert: false };
        // create a document that sets the plot of the movie
        const updateDoc = { $push: { "details": {"_id": new ObjectID(),"designation":designation,"prix":prix,"avancement":avancement} } };

        let result = await client
        .db()
        .collection("reparation")
        .updateOne(filter,updateDoc,options);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};

    const getReparationVoiture= async (req, res) => {
        try {
            var id = req.params.id;
            const collection = client.db().collection("reparation");
            collection.find({idvoiture : id }).sort({"date_depot": -1}).toArray((_err, docs) => {
                console.log(docs);
                res.status(200).json(docs);
            });

        } catch (error) {
            console.log(error);
            res.status(501).json(error);
        } 
    };

     const getReparationVoitureByEtat= async (req, res) => {
        try {
            var etat = req.params.etat;
            const collection = client.db().collection("reparation");
            collection.find({etat : etat }).sort({"date_depot": -1}).toArray((_err, docs) => {
                console.log(docs);
                res.status(200).json(docs);
            });

        } catch (error) {
            console.log(error);
            res.status(501).json(error);
        } 
    };
    
    const setPrix = async (req, res) => {
        try {
            let id = new ObjectID(req.body.id);
            var prix = 0;
            const filter = { _id: id };
    
            const collection = client.db().collection("reparation");
            const docs = await collection.find(filter).toArray();
    
            if (!docs.length) {
                throw new Error("reparation introuvable.");
            }
    
            for( var i = 0 ; i < docs[0].details.length ; i++){
                prix += Number(docs[0].details[i].prix);
            }
    
            console.log('vidiny'+prix);
    
            let result = await client
              .db()
              .collection("reparation")
              .updateOne({ _id: id }, { $set: { total : prix } });
            
            if (result.modifiedCount === 1) {
              res.status(200).json(result);
            } else {
              throw new Error("Erreur lors de la mise à jour du prix.");
            }
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    };
    

    const facturerEtat = async (req, res) => {
      let id = new ObjectID(req.params.id);
      let result = await client
        .db()
        .collection("reparation")
        .updateOne({ _id: id }, { $set: { facturer : 1 } });
      if (result.modifiedCount === 1) {
        res.status(200).json(result);
      }else if(result.matchedCount===1){
        res.status(200).json('deja facturer');
      } else {
        res.status(404).json(result);
      }
  };

    const findReparation= async (req, res) => {
        try {
            let id = new ObjectID(req.params.id);
            let cursor = client.db().collection("reparation").find({ _id: id });
            let result = await cursor.toArray();
            if (result.length > 0) {
              res.status(200).json(result[0]);
            } else {
              res.status(204).json({ msg: "Cet reparation n'existe pas" });
            }
          } catch (error) {
            console.log(error);
            res.status(501).json(error);
          }
    };

    const updateEtat = async (req, res) => {
      try {
        let id = new ObjectID(req.params.id);
        let etat = req.body.etat;
        console.log(etat);
        let result = await client
          .db()
          .collection("reparation")
          .updateOne({ _id: id }, { $set: { etat : etat } });
    
        if (result.modifiedCount === 1) {
          res.status(200).json({ msg: "Modification réussie" });
        } else {
          res.status(404).json({ msg: "Cet reparation n'existe pas" });
        }
      } catch (error) {
        console.log(error);
        res.status(501).json(error);
      }
    };


module.exports = {
  ajouterDetails,
  getReparationVoiture,
  findReparation,
  getReparationVoitureByEtat,
  updateEtat,
  setPrix,
  facturerEtat
};
