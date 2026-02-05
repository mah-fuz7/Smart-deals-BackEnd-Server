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
    res.send('Smart Deals Data comming very  soon')
})

// Run Func
async function run() {
    try{
    //  connect the server
    await client.connect();
// user Database and Database collection Here
const productDb=client.db('productDb')
const productColl=productDb.collection('products')
const bidsColl=productDb.collection('bids')
// 1. Post => send Data only one

app.post('/products',async(req,res) => {
    const newProduct=req.body;
    const result=await productColl.insertOne(newProduct);
    res.send(result);
})

// # Post many data in 1 time

// app.post('/products',async(req,res) => {
//     const newProducts=req.body;
//     const result=await productColl.insertMany(newProducts);
//     res.send(result);
// })

// 2. Get => find all Data from Database
app.get('/products', async(req,res) => {
 //# sort ,limit,skip
 
    // const sortFields={price_max:1};
    // const limitNum=3;
    // const skipNum=3;
    // const cursor=productColl.find().sort(sortFields).limit(limitNum).skip(skipNum);
// 
console.log(req.query)
const email=req.query.email;
const query={}
if(email){
    query.email=email;
}

    const cursor= productColl.find(query);
    const result= await cursor.toArray();
    // const result=await productColl.find().toArray();
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
//  # bids api is Here 
// Get all the bids from database
app.get('/bids',async(req,res) => {
    const cursor=bidsColl.find();
    const result=await cursor.toArray();
    res.send(result);
})
// get specific bid by id
app.get('/bids/:id',async(req,res) => {
    const id=req.params.id;
    const query={ _id:new ObjectId(id)};
    const result=await bidsColl.findOne(query);
    res.send(result);

})
// delete specific bid by id
app.delete('/bids/:id' ,async(req,res) => {
    const id=req.params.id;
    const query={_id:new ObjectId(id)};
    const result=await bidsColl.deleteOne(query);
    res.send(result);
})
// post a bid in database
app.post('/bids', async(req,res) => {
    const newBid=req.body;
    const result=await bidsColl.insertOne(newBid);
    res.send(result);
})

    // send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }finally{
 // Ensures that the client will close when you finish/error

    // await client.close();

    }
}

// app Listen Untill Database Not Ready
app.listen(port, () => {
    console.log(`server is running at ${port}`)
})

run().catch(console.dir);

