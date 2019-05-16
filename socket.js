var socket=io("127.0.0.1:80");
//修正，客户端直接即可
var curPosition=new Array();
function SendToServer(subName, Dict){
    socket.emit(subName, Dict);
}

/*
syncPosition(d)事件
作用：把d中的位置信息同步到本地的curPosition数组
参数：d(dict)
Keys:
    name(str): 同步对象的名称，如Police,Thief,TrashC
    ID(int): 同步对象的序号，0,1,2
    position(dict):
        x(positive int)
        y(positive int)

2019.5.15:change
use json set.
like what you see
*/

//let curPosition[id] be the id's Attributes

/*
d or curPosition:{
	"name":player's name type in by the players,
	"type":thief or police,
	"ID":own id in the room,
	"x":x position,
	"y":y position,
	"rotation":rotation,
	"status":lean or normal,
	"socketId":socketid, get when you connect, socketio will give you one
}
*/
socket.on('SyncPosition',function(d){
    curPosition[d["ID"]]= d;
});

//get in when disconnected delete id from curPosition and Delete the character from the screen
socket.on('SyncDisPosition',function(d){
	curPosition.splice(d["ID"],1);
	DeleteCharacter(d);
});

//get in when just connected, draw character on the screen
socket.on('Create',function(d){
	DrawOtherCharacter(d);
});


socket.on('sync_init',function(d){
    //
});

socket.on('BeHold',function(){
	BeHold=true;
});

socket.on('BeMove',function(d){
	MainCharacterBeMove(d);
});

socket.on('DisHold',function(){
	alert('dishold');
	BeHold=false;
});