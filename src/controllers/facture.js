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

const paiement = async (req, res) => {
    var id = ObjectID(req.body.id);
    var paiement = req.body.montant;
    var designation = req.body.designation;
    var date = req.body.date;
    console.log(req.body);
    var reste ;
    const filter = { _id: id };

    const options = { upsert: false };

    const updateDoc = { 
                        $push: 
                            { "paiement": 
                                {
                                    "_id": new ObjectID(),
                                    "designation": designation,
                                    "montant": paiement,
                                    "date": date
                                } 
                            },
                        $inc: { payer : paiement, reste : - paiement },
                    };

    try {
        const collection = client.db().collection("facture");
        const docs = await collection.find(filter).toArray();

        if (!docs.length) {
            res.status(404).json({ error: "facture introuvable." });
            return;
        }

        reste = docs[0].reste;
        if (reste < paiement) {
            res.status(401).json({ error: "Paiment superieur a la reste a payer." });
            return;
        }

        const journal = client.db().collection("journal");
        var dt = {
            "designation": "paiement facture pour designation : "+designation,
            "entree": paiement,
            "sortie" : 0,
            "date": date
        } 
        const data = await journal.insertOne(dt);

        const result = await collection.updateOne(filter, updateDoc, options);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de la paiement de facture." });
    }

};

module.exports = {
    getFacture,
    paiement
 };