const express= require('express')
const app=express()
const cors=require('cors')
const port= process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

// 1. Post => send Data 
app.post('/products',async(req,res) => {
    const newProduct=req.body;
    const result=await productColl.insertOne(newProduct);
    res.send(result);
})
// 2. Get => find all Data from Database
app.get('/products', async(req,res) => {
    const cursor=productColl.find();
    const result=await cursor.toArray();
    res.send(result)
})
// 3.Get:id => find specific Data from Database
app.get('/products/:id',async(req,res) =>{
    const id=req.params.id;
    const query={_id:new ObjectId(id)}
    const result=await productColl.findOne(query);
    res.send(result)
})

//4. Delelte => Delete Data from Database
app.delete('/products/:id',async(req,res) => {
    const id=req.params.id;
    const query ={ _id:new ObjectId(id)}
    const result=await productColl.deleteOne(query);
    res.send(result)
})
// 5. Patch => Update user Data
app.patch('/products/:id',async(req,res) => {
    const id=req.params.id;
    const UpdateProduct=req.body;
    const query ={ _id:new ObjectId(id)};
    const update ={
        $set: {
            name:UpdateProduct.name,
            price:UpdateProduct.price,
        }
    }
    const result=await productColl.updateOne(query,update)
    res.send(result)
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

