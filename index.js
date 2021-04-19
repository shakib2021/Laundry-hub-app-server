const express = require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
const ObjectId=require('mongodb').ObjectId;
const app = express()
const port = 5000
app.use(cors())
app.use(bodyParser.json())


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pl9oz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const servicesCollection = client.db("loundry").collection("service");
  const OrdersCollection = client.db("loundry").collection("saveOrders");
  const ReviewsCollection = client.db("loundry").collection("AllReviews");

  const AdminCollection = client.db("loundry").collection("Admin");
  
  // const reviewCollection = client.db("loundry").collection("saveReview");
 
    app.post("/addservices",(req,res)=>{
      let services=req.body;
     servicesCollection.insertOne(services);
    
 })
 app.post("/saveorders",(req,res)=>{
  let orders=req.body;
  OrdersCollection.insertOne(orders);

})
app.post('/addAdmin',(req,res)=>{
  let admin=req.body;
  AdminCollection.insertOne(admin)
})
app.get('/checkadmin',(req,res)=>{
AdminCollection.find()
.toArray((error,doc)=>{
  res.send(doc)
})
})

app.post("/addReview",(req,res)=>{

  let ReviewsAll=req.body;
  ReviewsCollection.insertOne(ReviewsAll)
})
app.get('/showReviews',(req,res)=>{
      ReviewsCollection.find()
      .toArray((error,doc)=>{

        res.send(doc)
      })
})


app.get('/showOrders',(req,res)=>{
  OrdersCollection.find()
  .toArray((error,doc)=>{

    res.send(doc)
  })
})

app.patch('/update',(req,res)=>{
  OrdersCollection.updateOne({_id: ObjectId(req.body.id)},
  {
    $set:{status:req.body.status}
  })
 
  .then(result=>{
    console.log(result)
   
  })
})

 app.get('/servicedata',(req,res)=>{
       servicesCollection.find()
       .toArray((error,doc)=>{

        res.send(doc)
      })
      })

 app.get('/showorder',(req,res)=>{
  OrdersCollection.find()
  .toArray((error,doc)=>{

   res.send(doc)
 })


})
console.log("DB connected")

});


app.listen(process.env.PORT|| port)