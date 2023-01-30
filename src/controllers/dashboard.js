const moment = require('moment');
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

const getMoyenneReparationVoiture= async (req, res) => {
    try {
        var etat = req.params.etat;
        startDate = req.body.startDate;
        endDate = req.body.endDate;
        console.log(startDate);
        console.log(endDate);
        const collection = client.db().collection("reparation");
        collection.find({etat : "terminé",  date_depot: {
            $gte: startDate,
            $lt: endDate
          } }).sort({"date_depot": -1}).toArray((_err, docs) => {
            console.log(docs);
            var temps = 0;
            for (let i = 0; i < docs.length; i++) {
                const datedebut = moment(docs[i].datedebutreparation, "DD/MM/YYYY HH:mm:ss");
                const datefin = moment(docs[i].dateterminaison, "DD/MM/YYYY HH:mm:ss");
                console.log(new Date(datedebut));
                console.log(datefin);
                temps = temps + datefin - datedebut;
              }
            moyenne = temps/docs.length;
            const reparationmoyenne = moment.duration(moyenne)._data.hours + "h " +moment.duration(moyenne)._data.minutes + "mn " + moment.duration(moyenne)._data.seconds +"sec";
            res.status(200).json({"reparationmoyenne" :reparationmoyenne});
        });

    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    } 
};


module.exports = {
    benefice,
    statistique,
    getMoyenneReparationVoiture
 };