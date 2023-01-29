const express = require("express");
const { connect } = require("./src/db/connect");
const routerUtilisateurs = require("./src/routers/utilisateur-routes");
const routerVoitures = require("./src/routers/voiture-routes");
const routerObject = require("./src/routers/object-routes");
const routerReparation = require("./src/routers/reparation-routes");
const routerFacture = require("./src/routers/facture-routes");
const routerJournal = require("./src/routers/journal-routes");
const routerMail = require("./src/routers/mail-routes");
const routerDashboard = require("./src/routers/dashboard-routes");



const bodyParser = require('body-parser');
const config = require('config');

var cors = require('cors');

var corsOptions = config.get('corsOptions');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/v1", routerUtilisateurs);
app.use("/api/v1", routerVoitures);
app.use("/api/v1", routerObject);
app.use("/api/v1", routerReparation);
app.use("/api/v1", routerFacture);
app.use("/api/v1", routerJournal);
app.use("/api/v1", routerMail);
app.use("/api/v1", routerDashboard);

const port = 3000;
const dbUrl = 'mongodb+srv://mean:mean1234@cluster0.tstxgfw.mongodb.net/?retryWrites=true&w=majority';

connect(dbUrl, (err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("Connexion avec la base de données établie");
    app.listen(port);
    console.log("Attente des requêtes au port "+port);
  }
}); 
