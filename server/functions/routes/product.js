const router = require("express").Router();
const express = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();
const Razorpay = require("razorpay");
var crypto = require("crypto");


router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    };
    const response = await db.collection("products").doc(`/${id}/`).set(data);
    console.log(response);

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

router.get("/all", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error: ${err}` });
    }
  })();
});
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

// add to cart

router.post("/addToCart/:user_Id", async (req, res) => {
  const userId = req.params.user_Id;
  const productId = req.body.productId;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`${userId}`)
      .collection("items")
      .doc(`${productId}`)
      .get();

    if (doc.exists) {
      // Product already exists in the cart, update the quantity

      console.log(doc.data().quantity);
      const quantity = doc.data().quantity + 1;
      await db
        .collection("cartItems")
        .doc(`${userId}`)
        .collection("items")
        .doc(`${productId}`)
        .update({ quantity });

      return res
        .status(200)
        .send({ success: true, msg: "Product quantity updated." });
    } else {
      // Product does not exist in the cart, add it as a new item
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      };

      await db
        .collection("cartItems")
        .doc(`${userId}`)
        .collection("items")
        .doc(`${productId}`)
        .set(data);

      return res
        .status(200)
        .send({ success: true, msg: "Product added to cart." });
    }
  } catch (err) {
    return res.status(500).send({ success: false, msg: `Error: ${err}` });
  }
});

// get all the cart items foe that user
router.get("/getCartItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error: ${err}` });
    }
  })();
});

// update the cart  to increase and decrease the quantity
router.post("/updateCart/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.query.product_Id;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${user_id}/`)
      .collection("items")
      .doc(`/${product_id}/`)
      .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        await db
          .collection("cartItems")
          .doc(`/${user_id}/`)
          .collection("items")
          .doc(`/${product_id}/`)
          .update({ quantity });

        return res
          .status(200)
          .send({ success: true, msg: "Product quantity updated." });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${user_id}/`)
            .collection("items")
            .doc(`/${product_id}/`)
            .delete()
            .then((result) => {
              return result.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().quantity - 1;
          await db
            .collection("cartItems")
            .doc(`/${user_id}/`)
            .collection("items")
            .doc(`/${product_id}/`)
            .update({ quantity });

          return res
            .status(200)
            .send({ success: true, msg: "Product quantity updated." });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  const cartData = req.body.data.cart.forEach((element) => {
    element.imageURL = "";
  });

  const customer = await stripe.customers.create({
    metadata: {
      user_Id: req.body.data.user.user_id,
      cart: JSON.stringify(cartData),
      total: req.body.data.total,
    },
  });

  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product_name,

          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.send({ url: session.url });
});







router.get("/orders", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("orders");
      let response = [];

      await query.get().then((querySnap) => {
        let docs = querySnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (error) {
      return res.send({ success: false, msg: `Error : ${error}` });
    }
  })();
});

router.post("/updateOrder/:order_id", async (req, res) => {
  const order_Id = req.params.order_id;
  const sts  = req.query.sts;

  try {
    const updatedItem = await db.collection("orders").doc(`/${order_Id}`).update({sts});

    return res.status(200).send({success : true ,data : updatedItem});
    
  } catch (error) {
     return res.send({success : false , msg : `Error: ${error}`})
  }
})


// payment route
// router.post("/checkout", async (req, res)=>{
//   const option = {
//     total : Number(req.body.total * 100),
//     currency : "IMR"
// }
// const order = await instance.orders.create(option)

// res.status(200).send({ success : true , msg: order})

// })
// // payment varification
// router.post('/paymentVerifiication' , async (req, res)=>{

//   res.status(200).send({ success: true})
// })

// // for getting the key
// router.get('/getKey' , async (req, res)=>{
//   res.status(200).send({ key :process.env.RAZORPAY_API_KEY})
// })

// router.post("/orders", async (req, res) => {
//   var instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_SECRET_KEY,
//   });

//   var options = {
//     amount: req.body.total * 100,
//     currency: "INR",
//   };

//   instance.orders.create(options, function (err, order) {
//     if (err) {
//       return res.send({ code: 500, message: "server error" });
//     }
//     return res.send({
//       code: 200,
//       message: "order created successfully",
//       data: order,
//     });
//   });
// });

// router.post("/verify", async (req, res) => {
//   let body =
//     req.body.response.razorpay_order_id +
//     "|" +
//     req.body.response.razorpay_payment_id;
//   var expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
//     .update(body.toString())
//     .digest("hex");

//   if (expectedSignature === req.body.response.razorpay_signature) {
//     res.send({ code: 200, message: "sign Valid" });
//     console.log("heloo");
//   } else {
//     res.send({ code: 500, message: "Sign Invalid" });
//   }
// });

module.exports = router;
