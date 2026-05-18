require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const Razorpay = require("razorpay");

const MONGODB_URI = process.env.MONGODB_URI;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const APP_NAME = process.env.APP_NAME || "MyShop";
const PORT = process.env.PORT || 3001;

if (!MONGODB_URI || !RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("ERROR: Missing required environment variables. Check your .env file.");
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(cors());
app.use(express.json());

async function start() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB");

  const db = client.db("dummy");
  const products = db.collection("product");

  app.get("/api/products", async (_req, res) => {
    const all = await products.find().toArray();
    res.json(all);
  });

  app.post("/api/payment/create-order", async (req, res) => {
    const { items } = req.body;

    const productIds = items.map((i) => new ObjectId(i.productId));
    const dbProducts = await products
      .find({ _id: { $in: productIds } })
      .toArray();
    const priceMap = new Map(dbProducts.map((p) => [String(p._id), p.price]));

    const totalPaise = items.reduce(
      (s, i) => s + Math.round(priceMap.get(i.productId) * 100) * i.qty,
      0,
    );

    const rpOrder = await razorpay.orders.create({
      amount: totalPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    res.json({
      orderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      keyId: RAZORPAY_KEY_ID,
      appName: APP_NAME,
    });
  });

  app.use((err, _req, res, _next) => {
    console.error("Route error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  });

  app.listen(PORT, () =>
    console.log(`API listening on http://localhost:${PORT}`),
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
