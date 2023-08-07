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

const getObject = async (req, res) => {
    try {
        const tablename = req.params.tablename; // Assuming you pass the tablename as a URL parameter
        const userId = req.params.userId;       // Assuming you pass the userId as a URL parameter

        // Perform the query to get the object from the database based on userId
        let result = await client
            .db()
            .collection(tablename)
            .find({ userId: userId }).toArray();

        if (result) {
            // Object found, return it as the response
            res.status(200).json(result);
        } else {
            // Object not found
            res.status(404).json({ message: "Object not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


module.exports = {
    addObject,
    getObject
};

