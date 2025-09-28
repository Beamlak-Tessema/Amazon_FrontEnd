

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
// setGlobalOptions({ maxInstances: 10 });


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Stripe Firebase API is running for project clone-47e8d ✅");
});

// Create payment intent
app.post("/payments/create", async (req, res) => {
  try {
    const total = req.body.total;

    console.log("Payment Request Received for this amount >>>", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // amount in cents
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

// Expose express API as a single cloud function:
exports.api = functions.https.onRequest(app);
