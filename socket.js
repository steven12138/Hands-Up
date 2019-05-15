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
socket.on('SyncPosition',function(d){
    curPosition[d["ID"]]= d;
});

socket.on('SyncDisPosition',function(d){
	curPosition.splice(d["ID"],1);
	DeleteCharacter(d);
});

socket.on('Create',function(d){
	DrawOtherCharacter(d);
});


socket.on('sync_init',function(d){
    //
});
