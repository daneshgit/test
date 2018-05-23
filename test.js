

const promise=require('bluebird');
//const MongoClient = promise.promisifyAll(require('mongodb').MongoClient);

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'newdb';

// Use connect method to connect to the server
MongoClient.connect(url,{useNewUrlParser: true }, async(err, client)=> {
 if(err){

    console.log(err);
 }else{
    console.log("Connected successfully to server");
    
      const db = client.db('newdb');

    
 
//to create a collection

     db.createCollection("node", {
      'validator': { '$and':
         [
            { 'phone': { '$type': "string" } },
            { 'email': { '$regex': /@mongodb\.com$/ } },
            { 'status': { '$in': [ "Unknown", "Incomplete" ] } }
         ]
      }
   },function(err,data){
       if(err){
         console.log(err);
       }else{
         console.log("collection created");
       }
     })



//to insert data
const datatable=db.collection('data');

/*
datatable.insert([{name:"jeeva",age:"25"},{name:"jeeva",age:"30"},{name:"danesh",age:"25"}],function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})
*/



//to updateone

datatable.updateOne({name:"dane"},{$set:{name:"arn"}},{upsert:true},function(err,data){
  if(err){
    console.log(err);
  }else{
    console.log(data.matchedCount);
  }
})



//to deleteone

datatable.deleteOne({name:"daneshg"}).then((data)=>console.log("deleted count"+data.deletedCount));

//to get collection
const collection=db.collection('users');


//to get index
collection.createIndex(
  { lastName : -1, dateOfBirth : 1 },
  { unique:true },
  function(err, result) {
    console.log(result);
    
});

//to find data in collection     
    
  const cursor=  datatable.find({}).filter({name:"jeeva"})



    while(await cursor.hasNext()) {
      const doc = await cursor.next();
     // console.log(doc);
    }

//bulk operation

const bulk =datatable.initializeOrderedBulkOp();

bulk.find({name:'arun'}).updateOne({name:'jeeva'});

bulk.execute(function(err,data){
  if(err){
    console.log(err);
  }
  else{
    console.log("bulk data");
  }
})


//aggregation

datatable.aggregate([{'$match':{'name':'jeeva'}},{ '$unwind': '$age'},{ '$group': { '_id': "$_id",'name':{'$last':'$name'}, 'total': { '$sum': 1 } } }
],function(err,data){
  if(err){
    console.log(err);
  }else{
    
    data.toArray(function(err, documents) {
      console.log(documents)
      
    });
  }
})


    
 }
  

});