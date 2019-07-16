MongoClient = require("mongodb").MongoClient ;
let url = "mongodb://localhost:27017/";

module.exports = class Mongo{

  constructor(date,chat,name){
    this.date = date ;
    this.chat = chat ;
    this.name = name
  } ;

  registration(){

    MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) =>{
      if (err) throw err ;

      let dbo = db.db("doctormario") ;
      let obj = {date : this.date ,chat : this.chat , name : this.name} ;
      dbo.collection("chat").insertOne(obj, function(err, res) {
        if (err) throw err ;
        console.log("Number of documents inserted: " + res.insertedCount) ;
        db.close() ;
      }) ;
    }) ;
  } ;


  findall(){
  let pr = new Promise(function(resolve, reject){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {

      if (err) throw err;
      let dbo = db.db("doctormario");
      dbo.collection("chat").find({},{ projection: { _id: 0 } }).toArray(function(err, result) {
        if (err) throw err;
        resolve(result) ;
        console.log("チャットlist書き出し")
        db.close();
      });
    });
  });
  return pr;
} ;

}
