import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("ERROR: MONGODB_URI is not set. Check your .env file.");
  process.exit(1);
}

const client = new MongoClient(uri, {
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

  const products = client.db("hpam").collection("prod");

  app.get("/product", async (_req, res) => {
    const all = await products.find().toArray();
    res.json(all);
  });

  app.get("/start", async (_req, res) => {
    console.log("start");
    // const all = await products.find().toArray();
    res.json({
      name: "start",
    });
  });

  app.post("/post", async (_req, res) => {
    console.log("post");
    console.log(_req);
    res.json({
      name: "post",
    });
  });

  const port = 3001;
  app.listen(port, () =>
    console.log(`API listening on http://localhost:${port}`),
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
