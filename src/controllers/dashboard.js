const { ObjectID } = require("bson");
const client = require("../db/connect");

const benefice= async (req, res) => {
    try {
        const data= req.body;
        console.log(data);
        const startDate = new Date(new Date(data.debut).toISOString().slice(0, 10));
        const endDate = new Date(new Date(data.fin).toISOString().slice(0, 10));
        var entree = 0;
        var sortie = 0;
        var condition;

        if(startDate != endDate) condition= {$gte:startDate,$lte:endDate}
        console.log(condition);

        const collection = client.db().collection("journal");
        var query ={ date: condition };
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            for( var i = 0 ; i < result.length ; i++){
                entree += Number(result[i].entree);
                sortie += Number(result[i].sortie);
            }
            res.status(200).json({ entree : entree, sortie : sortie ,  benefice : (entree-sortie) });
        });

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};

module.exports = {
    benefice
 };