const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const app = express();
admin.initializeApp({
  credential: admin.credential.cert("./credentials.json"),
});

// const db = admin.firestore();

app.get("/", (req, res)=>{
  return res.status(200).json({message: "Hello, world"});
});

app.use(require("./routes/routes"));

exports.app = functions.https.onRequest(app);
