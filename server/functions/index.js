/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('dotenv').config();
const port = process.env.PORT||8000;




const serviceAccountKey = require('./serviceAccountKey.json');
const express = require('express');
const app = express()

// Body parser for our json data
app.use(express.json())

const cors = require('cors');
app.use(cors({origin : true}));
app.use ((req, res, next) =>{
    res.set("Access-Control-Allow-Origin","*");
    next();
})

// firebase credential
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });

app.get("/", (req, res) =>{
     res.send("hello world");
})

const userRoute = require('./routes/user')
app.use("/api/users",userRoute)

// <<<<<<< HEAD

const productRoute = require('./routes/product')
app.use("/api/products/",productRoute)

app.listen(port, (req, res) => {
    console.log(`app listening on port ${port}`)
})


// exports.app = functions.https.onRequest(app)
// =======
// exports.app = functions.https.onRequest(app)

// >>>>>>> 4421ccc832c60d9a6745e13c4baa35d116838fa6
