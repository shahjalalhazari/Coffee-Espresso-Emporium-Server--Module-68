const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cp5mulo.mongodb.net/?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
    res.send("Coffee Espresso Emporium Server is Running")
})


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const coffeeCollection = client.db("coffeeDB").collection("coffee");
    
    // Get all the coffee
    app.get("/coffee", async (req, res) => {
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    // Add new coffee
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      console.log("new Coffee Added", newCoffee);
      const result = await coffeeCollection.insertOne(newCoffee);
      res.send(result);
    })

    // Delete a coffee
    app.delete("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await coffeeCollection.deleteOne(query);
      res.send(result)
    })
    // Update a coffee details
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`Our espresso emporium server is running on ${port}`);
})