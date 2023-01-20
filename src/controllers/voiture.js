const { ObjectID } = require("bson");
const client = require("../db/connect");

const ajouterVoiture = async (req, res) => {
  try {
    let id_utilisateur = ObjectID(req.body.id_utilisateur);
    var type = req.body.type
    var modele = req.body.modele
    var matriculation = req.body.matriculation
    var img = req.body.img

    const filter = { _id: id_utilisateur };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $push: { "voiture": {"_id": new ObjectID(),"type":type,"modele":modele,"matriculation":matriculation,"image":img} }
      ,
    };

    let result = await client
      .db()
      .collection("utilisateurs")
      .updateOne(filter,updateDoc,options);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  } 
};


const getVoitures = async (req, res) => {
  try {
    let cursor = client
      .db()
      .collection("voitures")
      .find()
      .sort({ noms: 1 });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "Aucun voitures trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getVoiture = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.db().collection("voitures").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "Cet voiture n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const updateVoiture = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let immatriculation = req.body.immatriculation;
    let modele = req.body.modele;
    let idclient = req.body.idclient;
    let result = await client
      .db()
      .collection("voitures")
      .updateOne({ _id: id }, { $set: { immatriculation, modele, idclient } });

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Modification réussie" });
    } else {
      res.status(404).json({ msg: "Cet voiture n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const deleteVoiture = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client
      .db()
      .collection("voitures")
      .deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Suppression réussie" });
    } else {
      res.status(404).json({ msg: "Cet voiture n'existe pas" });
    }
  } catch (error) {
    console.log(error);

    res.status(501).json(error);
  }
};

module.exports = {
  ajouterVoiture,
  getVoitures,
  getVoiture,
  updateVoiture,
  deleteVoiture
};
