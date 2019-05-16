/*
2019-5-16 change
add more space to let them be different and easy to find out
*/
//include
var express = require('express');
var app = express();
var path =  require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);

//let html be able to include the script
app.use(express.static(__dirname));

//init the playerlist
var playerlist= new Array();

//when the users require
//send them this heml
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
  	/*show d structrue and rename action to status,
  	 also remember the socketid to help when the player disconnect*/
  	io.emit("SyncData",d);//send back
  	//let the server remember data
  	playerlist[socket.id]=d;
  });


//send to the player it should be
  socket.on("BeHold",function(d){
  	io.to(d['socketId']).emit("BeHold");
  });



  //when the client connect will resive this
  socket.on("create",function(d){
  	//let all players draw this player
  	console.log('get');
  	io.emit("Create", d);
  });


//send back
  socket.on('BeMove',function(d){
  	io.to(d['HoldInformation']['socketId']).emit("BeMove", d['Position']);
  });


//sandback
  socket.on("DisHold",function(d){
  	console.log("dishold");
  	io.to(d['socketId']).emit("DisHold");
  });

  //run when disconnect,
  //let other players remove him
  socket.on("disconnect",function(){
  	console.log('dis');
  	//get the information from data
	var d = playerlist[socket.id];//note the client to remove the character
	io.emit("SyncDisData", d);
  });
});

//listening on *:80
http.listen(80, function(){
  console.log('listening on *:80');
});