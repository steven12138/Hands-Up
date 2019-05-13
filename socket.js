var io = require('socket.io');
var serverIp;
var socket = io.connect(serverIp);

function sendToServer(subName, Dict){
    socket.emit(subName, Dict);
}

socket.on('syncPolicePosition',function(d){
    curPosition[d["name"]]["x"] = d["position"]["x"];
    curPosition[d["name"]]["y"] = d["position"]["y"];
})
socket.on('syncThiefPosition',function(d){
    curPosition[d["name"]][d["ThiefID"]]["x"] = d["position"]["x"];
    curPosition[d["name"]][d["ThiefID"]]["y"] = d["position"]["y"];
})
socket.on('syncTrashCanPosition',function(d){
    curPosition[d["name"]][d["TrashCanID"]]["x"] = d["position"]["x"];
    curPosition[d["name"]][d["TrashCanID"]]["y"] = d["position"]["y"];
})
socket.on('sync_init',function(d){
    //
})
