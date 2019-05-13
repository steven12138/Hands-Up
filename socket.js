var socket=io("127.0.0.1:80");
//修正，客户端直接即可

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
