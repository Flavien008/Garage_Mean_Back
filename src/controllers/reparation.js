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



module.exports = {
  ajouterDetails,
  getReparationVoiture
};
