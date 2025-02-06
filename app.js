const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
// console.log(uri)

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

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
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//receives data from mongoDB
async function getData() {
  await client.connect();
  let collection = await client.db("justworks-app-db").collection("justwork-app-names");
  let results = await collection.find({}).toArray();
  console.log(results);
  return results;
}

//reads data from the collection and logs to the console
app.get('/read', async function (req, res) {
  let getDataResults = await getData();
  console.log(getDataResults);
  res.render('songs',
    { songData: getDataResults });
})


// endpoint, middlewares(s)
app.get('/', function (req, res) {
  res.sendFile('index.html')
})

//now has "nodemon" page, create link to this page
app.get('/nodemon', function (req, res) {
  res.send('this is a working page')
})


app.get('/insert', async (req, res) => {

  console.log('in /insert');

  let newSong = req.query.myName;
  // let newSong = req.body.myName;
  console.log(newSong);
  //connect to db,
  await client.connect();
  //point to the collection 
  await client.db("justworks-app-db").collection("justwork-app-names").insertOne({ given_name : "newSong" });
  res.redirect('/read');

});

app.post('/delete/:id', async (req,res)=>{

  console.log("in delete, req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("justworks-app-db").collection("justwork-app-names");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)}).then(result => {
  console.log(result); 
  res.redirect('/read');})

})


app.post('/update', async (req,res)=>{

  console.log("req.body: ", req.body)

  client.connect; 
  const collection = client.db("justworks-app-db").collection("justwork-app-names");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.body.nameID)}, { $set: {given_name: req.body.inputUpdateName } }
)
.then(result => {
  console.log(result); 
  res.redirect('/read');
})
});


app.get('/ejs', function (req, res) {
  res.render('words',
    { pageTitle: req.body.MyName });
})

app.get('/helloRender', function (req, res) {
  res.send('Hello from Real World<br><a href="/">return home<a>')
})
//uses POST method to get info from the dom
app.post('/saveMyName', function (req, res) {
  console.log('did we hit the endpoint?');
  console.log(req.body);
  res.render('words', { pageTitle: req.body.MyName });
})
//uses query from dom to get information
//needs work getting the info back to req
app.get('/saveMyNameGet', function (req, res) {
  console.log('did we hit the get endpoint?');
  console.log(req.query);
  res.redirect('/ejs');
  let reqName = req.query.MyName;
  res.render('words', { pageTitle: reqName })
})


app.listen(port, () => console.log(`server is running on ... ${port}`));

/*  
"npm i express"
"npm i body-parser"
"npm i ejs"
"npm i mongodb"
"npm i dotenv"
*/