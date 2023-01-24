const client = require("../db/connect");

const getJournal = async (req, res) => {
    try {
      let cursor = client
        .db()
        .collection("journal")
        .find()
        .sort({ date: 1 });
      let result = await cursor.toArray();
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ msg: "Aucun journal." });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  };

  module.exports = {
    getJournal
  };