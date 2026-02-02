const express= require('express')
const app=express()
const cors=require('cors')
const port= process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json())

// #UserName : UserProductdb
// #UserPassword : 8jw2axEpxr7uGk7b

const uri = "mongodb+srv://UserProductdb:8jw2axEpxr7uGk7b@cluster0.due0kmg.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/',(req,res) => {
    res.send('Smart Deals Data comming soon')
})

// Run Func
async function run() {
    try{
    //  connect the server
    await client.connect();
// user Database and Database collection Here
const productDb=client.db('productDb')
const productColl=productDb.collection('products')

// 1. Post to send the data to the Database
app.post('/products',async(req,res) => {
    const newProduct=req.body;
    const result=await productColl.insertOne(newProduct);
    res.send(result);
})


// app Listen Untill Database Not Ready
app.listen(port, () => {
    console.log(`server is running at ${port}`)
})
    // send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }finally{
 // Ensures that the client will close when you finish/error

    // await client.close();

    }
}
run().catch(console.dir);

