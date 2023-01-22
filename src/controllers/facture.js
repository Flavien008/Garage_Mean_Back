const { ObjectID } = require("bson");
const client = require("../db/connect");

const getFacture= async (req, res) => {
    try {
        console.log('atyyy');
        var id = req.params.id;
        const collection = client.db().collection("facture");
        collection.find({idreparation : id }).sort({"datefacture": -1}).toArray((_err, docs) => {
            console.log(docs);
            res.status(200).json(docs[0]);
        });

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};

module.exports = {
    getFacture
 };