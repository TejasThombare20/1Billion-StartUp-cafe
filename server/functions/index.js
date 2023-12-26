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
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');



const serviceAccountKey = require('./serviceAccountKey.json');
const express = require('express');

const app = express()
// Body parser for our json data



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

app.use(bodyParser.json({
  verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith('/webhook')) {
          req.rawBody = buf.toString()
      }
  }
}));

let endpointSecret = process.env.WEBHOOK_SECRET || "";

app.post(
  "/webhook",   
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    console.log("sig",sig)
     
   console.log("Request :",request)
   console.log("Headers",request.headers)

    let eventType;
    let data;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody,
          sig,
          endpointSecret
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        create0rder(customer, data, response);
      });
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

const create0rder = async (customer, intent, res) => {
  try {
    const orderId = Date.now();

    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };

    await db.collection("/orders").doc(`/${orderId}/`).set(data);
    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));

    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};
const deleteCart = async (userId, items) => {
    items.map(async (data) => {
      await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${data.productId}/`)
        .delete();
    });
  };



app.use(express.json())
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
