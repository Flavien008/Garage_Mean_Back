const { ObjectID } = require("bson");
const client = require("../db/connect");

const benefice= async (req, res) => {
    try {
        // var data= req.params.body;
        // var d1 = new Date(data.debut) ;
        // var d2 = new Date(data.fin) ;

        const collection = client.db().collection("journal");
        var query = { date: { $gt: new Date("2023-01-01") } };
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result);
        });

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};

module.exports = {
    benefice
 };