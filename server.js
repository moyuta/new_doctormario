let http = require("https");
let fs = require("fs");
let url = require("url");



let app = require("http")

  .createServer(handler)
  .listen(process.env.PORT || 3000);
console.log("doctormario server start!");

function handler(req, res) {
  let q = url.parse(req.url, true);


  switch (q.pathname) {
    case "/":
      fs.readFile("./view/index.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;

       case "/youtube":
      fs.readFile("./view/youtube.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;

       case "/chapter":
      fs.readFile("./view/chapter.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;


       case "/character":
      fs.readFile("./view/character.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;


      case "/daiyamond":
      fs.readFile("./view/daiyamond.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;


       case "/gacha":
      fs.readFile("./view/gacha.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;

       case "/item":
      fs.readFile("./view/item.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;


       case "/heart":
      fs.readFile("./view/heart.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;


       case "/progress":
      fs.readFile("./view/progress.html", "UTF-8", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;

      case "/board":
      fs.readFile("./view/board.html", "UTF-8", function(err, data) {

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      break;



    case "/index.css":
      fs.readFile("./view/style/index.css", "UTF-8",function (err, data) {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(data);
        res.end();
      });
      break;


    case "/style.css":
      fs.readFile("./view/style/style.css", "UTF-8",function (err, data) {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(data);
        res.end();
      });
      break;





  }
}
let io  = require("socket.io").listen(app) ;
const headimg = fs.readFileSync('./image/head.jpg') ;
const dot     = fs.readFileSync('./image/dot.png') ;
const baikin  = fs.readFileSync('./image/バイキン.jpeg') ;
const olddoc  = fs.readFileSync('./image/旧ドクターマリオ.jpeg') ;
const world   = fs.readFileSync('./image/world.png') ;
const imgbox= { headimg:headimg,
                  dot : dot,
                  baikin : baikin,
                  olddoc : olddoc  ,
                  world : world
               };

let Mongo = require("./view/js/chat.js") ;
let chat_registration = require("./view/js/chat.js").registration ;


io.sockets.on("connection", socket => {
    //画像のsocket
    socket.on("s",(s) =>{
      socket.emit("head",imgbox);
    });
    //更新socket
    socket.on("update",()=>{
    let chat = new Mongo() ;
    chat.findall().then(function(data) {
      socket.emit("msg_list",data);
    }) ;
    }) ;
    //チャット内容socket
    socket.on("msg_from_client",(data)=>{
      console.log("繋がった");
      let chat = new Mongo(data.date,data.chat,data.name)
      chat.registration() ;
      // socket.emit("msg_from_server",data) ;
      // console.log("送った");
    })
});
