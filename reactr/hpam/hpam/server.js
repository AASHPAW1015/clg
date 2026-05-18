import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb://AASHPAW:Ashu1234234@ac-nyx59dq-shard-00-00.nawkbxt.mongodb.net:27017,ac-nyx59dq-shard-00-01.nawkbxt.mongodb.net:27017,ac-nyx59dq-shard-00-02.nawkbxt.mongodb.net:27017/?ssl=true&replicaSet=atlas-6dx3n9-shard-0&authSource=admin&appName=Cluster0";

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
