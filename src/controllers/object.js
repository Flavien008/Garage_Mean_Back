const { ObjectID } = require("bson");
const client = require("../db/connect");

const addObject = async (req, res) => {
    try {
        let objet = req.body
        let tablename = req.body.tablename
        if(tablename=='journal') req.body.date = new Date(req.body.date);
        if(tablename=='reparation') req.body.date_depot = new Date(req.body.date_depot);

        delete req.body.tablename

        let result = await client
        .db()
        .collection(tablename)
        .insertOne(objet);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

module.exports = {
    addObject
};
