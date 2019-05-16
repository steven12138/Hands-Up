/*
2019-5-16 change
add more space to let them be different and easy to find out
*/

var express = require('express');
var app = express();
var path =  require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

var playerlist= new Array();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/MainActivity.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  //resive the message that sync the position
  socket.on("SyncData",function(d){
  	//remember the socketid and other imformation
  	var d={
  		"name":d['name'],
  		"type":d['type'],
  		"ID":d['ID'],
  		"x":d['x'],
  		"y":d['y'],
  		"rotation":d['rotation'],
  		"status":d['action'],
  		"socketId":socket.id
  	};
  	io.emit("SyncData",d);//send back
  	playerlist[socket.id]=d;
  });



  socket.on("BeHold",function(d){
  	io.to(d['socketId']).emit("BeHold");
  });



  //when the client connect will resive this
  socket.on("create",function(d){
  	console.log('get');
  	io.emit("Create", d);
  });


  socket.on('BeMove',function(d){
  	io.to(d['HoldInformation']['socketId']).emit("BeMove", d['Position']);
  });



  socket.on("DisHold",function(d){
  	console.log("dishold");
  	io.to(d['socketId']).emit("DisHold");
  });


  socket.on("disconnect",function(){
  	console.log('dis');
	var d = playerlist[socket.id];//note the client to remove the character
	io.emit("SyncDisData", d);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});