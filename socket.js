var io = require('socket.io');
var serverIp;
var socket = io.connect(serverIp);

function sendToServer(subName, Dict){
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
*/
socket.on('syncPosition',function(d){
    curPosition[d["name"]][d["ID"]]["x"] = d["position"]["x"];
    curPosition[d["name"]][d["ID"]]["y"] = d["position"]["y"];
})

socket.on('sync_init',function(d){
    //
})
