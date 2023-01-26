const { ObjectID } = require("bson");
const client = require("../db/connect");

const benefice = async (req, res) => {
    try {
        // Connect to the MongoDB server
        const data = req.body;
        const startDate = new Date(data.debut);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(data.fin);
        endDate.setUTCHours(23, 59, 59, 999);
        const collection = client.db().collection('journal');

        const pipeline = [
            {
              $match: {
                date: {
                  $gte: startDate,
                  $lte: endDate
                }
              }
            },
            {
              $group: {
                _id: null,
                entree: { $sum: '$entree' },
                sortie: { $sum: '$sortie' },
                benefice: { $sum: { $subtract: ["$entree", "$sortie"] } }
              }
            }
          ];

        // Execute the aggregate pipeline
        const result = await collection.aggregate(pipeline).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};


const statistique = async (req, res) => {
    try {
        // Connect to the MongoDB server
        const data = req.body;
        const startDate = new Date(data.debut);
        startDate.setUTCHours(0, 0, 0, 0);
        const endDate = new Date(data.fin);
        endDate.setUTCHours(23, 59, 59, 999);
        const collection = client.db().collection('journal');

        const pipeline = [
            {
                $match: {
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    entree: { $sum: '$entree' },
                    sortie: { $sum: '$sortie' },
                    benefice: { $sum: { $subtract: ["$entree", "$sortie"] } }
                }
            }
        ];

        // Execute the aggregate pipeline
        const result = await collection.aggregate(pipeline).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};


module.exports = {
    benefice,
    statistique
 };