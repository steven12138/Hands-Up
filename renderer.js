//get client size
var MainCharacterX=100;
var MainCharacterY=100;
var ClientWidth = document.body.clientWidth;
var ClientHeight = document.body.clientHeight;
//get sqrt(2) let the caculate easy
var Sqrt_2=Math.sqrt(2);
var Type=Math.floor((Math.random()*2)+1);
var ID=Math.floor((Math.random()*100000)+1);
var Name="test";
if(Type==1)
var MainCharacterType="police";
else
var MainCharacterType="thief";
var HoldID=0;
//value about holding things

var MapLoadFinish=false;

//crate app to draw on it
let app = new PIXI.Application({
	width: ClientWidth,
	height: ClientHeight,
	transparent: true,
});
//put the app to the html
document.body.appendChild(app.view);


//character and map object
let MainCharacterNormal;
let MainCharacterLean;
let Map;

//load texture
PIXI.loader
	.add("police-normal","Image/MainChara-police-normal.png")
	.add("police-lean","Image/MainChara-police-lean.png")
	.add("thief-normal","Image/MainChara-thief-normal.png")
	.add("thief-lean","Image/MainChara-thief-lean.png")
	.add("Map","Image/Map.png")
	.add("Police-car","Image/PoliceCar.png")
	.load(setup); //run setup() after finish loading



function setup()
{
	if(!MapLoadFinish)
		AddMap();  //add map to the webside
	AddMainCharacter(MainCharacterType);//add character to the webside
	app.ticker.add(delta=>GameLoop(delta)) //run gameloop() in each 1/60 sec
}

function AddMap()	
{
	Map = new PIXI.Sprite(PIXI.Texture.fromImage("Map"));//new PIXI object

	//random born
	var BornX=Math.floor((Math.random()*5500)+1);
	var BornY=Math.floor((Math.random()*3000)+1);
	BornX=-BornX;
	BornY=-BornY;

	//if born in the wall, reset the (x,y)
	while(WallCollisionBox[parseInt(-(BornX-(ClientWidth/2-2*(57/2))))][parseInt(-(BornY-(ClientHeight/2-2*(67/2))))]
	 ||WallCollisionBox[parseInt(-(BornX-(ClientWidth/2)))][parseInt(-(BornY-(ClientHeight/2)))]
	 ||WallCollisionBox[parseInt(-(BornX-(ClientWidth/2)))][parseInt(-(BornY-(ClientHeight/2-2*(67/2))))]
	 ||WallCollisionBox[parseInt(-(BornX-(ClientWidth/2-2*(57/2))))][parseInt(-(BornY-(ClientHeight/2)))])
	{
		BornX=Math.floor((Math.random()*5500)+1);
		BornY=Math.floor((Math.random()*3000)+1);
		BornX=-BornX;
		BornY=-BornY;
	}

	//set map id;
	Map.x=BornX;
	Map.y=BornY;
	var PositionX;
	var PositionY;
	PositionX=parseInt(ClientWidth/2-(57/2)-Map.x);
	PositionY=parseInt(ClientHeight/2-(67/2)-Map.y);
	SendToServer("create",{"name":Name,"ID":ID,"x":PositionX,"y":PositionY,"rotation":MouseAngle,"action":MainCharaLeanStatus,"type":MainCharacterType});
	app.stage.addChild(Map);//add to the app
	MapLoadFinish=true;
}

function AddMainCharacter(MainCharacterType)
{
	MainCharacterNormal = new PIXI.Sprite(PIXI.Texture.fromImage(MainCharacterType+"-normal"));//new PIXI object
	MainCharacterLean = new PIXI.Sprite(PIXI.Texture.fromImage(MainCharacterType+"-lean"));//new PIXI object
	MainCharacterNormal.anchor.x=0.5;//set anchor
	MainCharacterNormal.anchor.y=0.5;
	MainCharacterNormal.x=ClientWidth/2-(57/2);//set position
	MainCharacterNormal.y=ClientHeight/2-(67/2);
	MainCharacterNormal.visible=true;
	//
	MainCharacterLean.anchor.x=0.5;//set anchor
	MainCharacterLean.anchor.y=0.5;
	MainCharacterLean.x=ClientWidth/2-(57/2);//set position
	MainCharacterLean.y=ClientHeight/2-(67/2);
	MainCharacterLean.visible=false;


	app.stage.addChild(MainCharacterNormal);
	app.stage.addChild(MainCharacterLean);//add to the app
}


//gameloop will run each 1/60 sec
function GameLoop(delta)
{
	if(!BeHold)
		MoveMainCharacter();
	UpdateMainCharacterRotate();
	ChangeMainCharacterAction();
	MoveOtherCharacter();
	if(IsHold)
		MoveHoldCharacter();
}

//change lean or normal
function ChangeMainCharacterAction()
{
	if(MainCharaLeanStatus)
	{
		MainCharacterLean.visible=true;
		MainCharacterNormal.visible=false;
	}
	else
	{
		MainCharacterLean.visible=false;
		MainCharacterNormal.visible=true;
	}
}

//let the character face to your mouse
function UpdateMainCharacterRotate()
{
	MainCharacterNormal.rotation=MouseAngle;
	MainCharacterLean.rotation=MouseAngle;
}

//caculate the dis between you and other player
function Distance(x1,y1,x2,y2)
{
	return parseInt(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
}

//move map to let player think the main character is moving
function MoveMainCharacter()
{
	var MoveDeltaX=DeltaX;
	var MoveDeltaY=DeltaY;
	//x axis out of the map
	if(parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))>=6195||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2)))>=6195||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2)))>=6195||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))>=6195||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))<=5||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2)))<=5||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2)))<=5||
	   parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))<=5)
	{
		MoveDeltaX=0;
	}
	//y axis out of the map, already success
	if(parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))>=3568||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2)))>=3568||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))>=3568||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2)))>=3568||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))<=0||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2)))<=0||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))<=0||
	   parseInt(-(Map.y-DeltaY-(ClientHeight/2)))<=0)
	{
		MoveDeltaY=0;
	}
	//still have some bug on it so just comment them.
	//have collision with other players

	//arrayname.forEach(function(e){});is a way to look all members in the array
	dataSync.forEach(function(e)
	{
		//not me and not the thing I hold
		if(e['ID']!=ID&&e['ID']!=HoldID)
		{
				//caculate the dis
				var MainCharacterPositionX=parseInt(ClientWidth/2-(57/2)-Map.x)+MoveDeltaX;
				var MainCharacterPositionY=parseInt(ClientHeight/2-(67/2)-Map.y);
				var OtherCharacterPositionX=e['x'];
				var OtherCharacterPositionY=e['y'];
				var DistanceMainCharacterOtherCharacter = Distance(MainCharacterPositionX,
																   MainCharacterPositionY,
																   OtherCharacterPositionX,
																   OtherCharacterPositionY
																  );
				//if to close don't go
				if(DistanceMainCharacterOtherCharacter<57)
					MoveDeltaX=0;
		}

	});

	//same with the upper one
	dataSync.forEach(function(e)
	{
		if(e['ID']!=ID&&e['ID']!=HoldID)
		{
			//caculate the dis
			var MainCharacterPositionX=parseInt(ClientWidth/2-(57/2)-Map.x);
			var MainCharacterPositionY=parseInt(ClientHeight/2-(67/2)-Map.y)+MoveDeltaY;
			var OtherCharacterPositionX=e['x'];
			var OtherCharacterPositionY=e['y'];
			var DistanceMainCharacterOtherCharacter = Distance(MainCharacterPositionX,
															   MainCharacterPositionY,
															   OtherCharacterPositionX,
															   OtherCharacterPositionY
															  );
			if(DistanceMainCharacterOtherCharacter<57)
				MoveDeltaY=0;
		}

	});
	if(MoveDeltaY&&MoveDeltaX)
	{
		if(MoveDeltaY>0)
			MoveDeltaY=5*Sqrt_2/2;
		else
			MoveDeltaY=-(5*Sqrt_2/2);
		if(MoveDeltaX>0)
			MoveDeltaX=5*Sqrt_2/2;
		else
			MoveDeltaX=-(5*Sqrt_2/2);
	}
	//if go x will get into the wall, stop the require
	if(!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2)))][parseInt(-(Map.y-(ClientHeight/2)))]
	 &&!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2)))][parseInt(-(Map.y-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-(ClientHeight/2)))])
	{
		Map.x-=MoveDeltaX;
		dataSync.forEach(function(e){
			if(e['ID']!=ID)//not yourself
			{
				//if you are not exist create other player
				if(!OtherPlayersNormal[e['ID']])
					DrawOtherCharacter(e);

				//set position
				OtherPlayersNormal[e['ID']].x-=MoveDeltaX;
				OtherPlayersLean[e['ID']].x-=MoveDeltaX;
			}
		});
	}

	//if go y will get into the wall, stop the require
	if(!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2)))][parseInt(-(Map.y-DeltaY-(ClientHeight/2)))]
	 &&!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2)))][parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-DeltaY-(ClientHeight/2)))])
	{
		Map.y-=MoveDeltaY;
		dataSync.forEach(function(e){
			if(e['ID']!=ID)//not yourself
			{
				//if you are not exist create other player
				if(!OtherPlayersNormal[e['ID']])
					DrawOtherCharacter(e);

				//set position
				OtherPlayersNormal[e['ID']].y-=MoveDeltaY;
				OtherPlayersLean[e['ID']].y-=MoveDeltaY;
			}
		});
	}
	//caculate the real position and send to the server.
	var PositionX;
	var PositionY;
	PositionX=parseInt(ClientWidth/2-(57/2)-Map.x);
	PositionY=parseInt(ClientHeight/2-(67/2)-Map.y);
	SendToServer("SyncData",{"name":Name,"ID":ID,"x":PositionX,"y":PositionY,"rotation":MouseAngle,"action":MainCharaLeanStatus,"type":MainCharacterType});
}

let OtherPlayersNormal=new Array();
let OtherPlayersLean=new Array();
//draw other character
function DrawOtherCharacter(d)
{
	if(!MapLoadFinish)
		AddMap();
	if(d['ID']!=ID)
	{

		//caculate the map position
		var MapX=parseInt(ClientWidth/2-(57/2)-d['x']);
		var MapY=parseInt(ClientHeight/2-(67/2)-d['y']);

		OtherPlayersNormal[d['ID']] = new PIXI.Sprite(PIXI.Texture.fromImage(d['type']+"-normal"));//new PIXI object
		OtherPlayersLean[d['ID']] = new PIXI.Sprite(PIXI.Texture.fromImage(d['type']+"-lean"));//new PIXI object

		//normal action
		OtherPlayersNormal[d['ID']].anchor.x=0.5;//set anchor
		OtherPlayersNormal[d['ID']].anchor.y=0.5;
		OtherPlayersNormal[d['ID']].x=MapX;//set position
		OtherPlayersNormal[d['ID']].y=MapY;
		OtherPlayersNormal[d['ID']].visible=!d['action'];

		//Lean action
		OtherPlayersLean[d['ID']].anchor.x=0.5;//set anchor
		OtherPlayersLean[d['ID']].anchor.y=0.5;
		OtherPlayersLean[d['ID']].x=ClientWidth/2-(57/2);//set position
		OtherPlayersLean[d['ID']].y=ClientHeight/2-(67/2);
		OtherPlayersLean[d['ID']].visible=d['action'];

		//draw them on the screen
		app.stage.addChild(OtherPlayersLean[d['ID']]);
		app.stage.addChild(OtherPlayersNormal[d['ID']]);
	}
}

//run when other players disconnected.
function DeleteCharacter(d)
{
	//remove other player from the app
	app.stage.removeChild(OtherPlayersNormal[d['ID']]);
	app.stage.removeChild(OtherPlayersNormal[d['ID']]);
	//delete other player from the array
	OtherPlayersNormal.splice(d['ID'],1);
	OtherPlayersNormal.splice(d['ID'],1);
}


//move other character
function MoveOtherCharacter()
{
	dataSync.forEach(function(e){
		if(e['ID']!=ID)//not yourself
		{
			//caculate the map position
			var MapX=parseInt(Map.x+e['x']);
			var MapY=parseInt(Map.y+e['y']);

			//if you are not exist create other player
			if(!OtherPlayersNormal[e['ID']]||!OtherPlayersLean[e['ID']])
				DrawOtherCharacter(e);

			//set position
			OtherPlayersNormal[e['ID']].x=MapX;
			OtherPlayersLean[e['ID']].x=MapX;
			OtherPlayersNormal[e['ID']].y=MapY;
			OtherPlayersLean[e['ID']].y=MapY;
			//set rotation
			OtherPlayersLean[e['ID']].rotation=e['rotation'];
			OtherPlayersNormal[e['ID']].rotation=e['rotation'];

			//set status
			OtherPlayersNormal[e['ID']].visible=!e['status'];
			OtherPlayersLean[e['ID']].visible=e['status'];
		}
	});
}

//hold function
var BeHold=false;
var IsHold=false;

//run when you push the mouse
function TryHoldOtherCharacter()
{
	if (BeHold) return;
	//because only can hold one person but forEach have no break
	var FinishWhile=false;
	dataSync.forEach(function(e)
	{
		if(!FinishWhile)
		{
			if(e['ID']!=ID)
			{
				//caculate the dis
				var MainCharacterPositionX=parseInt(ClientWidth/2-(57/2)-Map.x);
				var MainCharacterPositionY=parseInt(ClientHeight/2-(67/2)-Map.y);
				var OtherCharacterPositionX=e['x'];
				var OtherCharacterPositionY=e['y'];
				var DistanceMainCharacterOtherCharacter = Distance(MainCharacterPositionX,
																   MainCharacterPositionY,
																   OtherCharacterPositionX,
																   OtherCharacterPositionY
																  );
				if(DistanceMainCharacterOtherCharacter<85)//find people around me hold him
				{
					SendToServer("BeHold",dataSync[e['ID']]); //tell servr
					IsHold=true;
					HoldID=e['ID'];//remember the id you hold
					FinishWhile=true;//same with break
				}
			}
		}

	});
}

function MoveHoldCharacter()
{
	//caculate the real position
	var PositionX;
	var PositionY;
	PositionX=parseInt(ClientWidth/2-(57/2)-Map.x);
	PositionY=parseInt(ClientHeight/2-(67/2)-Map.y);

	//use sin and cos to caculate the position behold player should be
	var HoldCharacterX=PositionX+57*Math.cos(MainCharacterNormal.rotation-Math.PI/2);
	var HoldCharacterY=PositionY+57*Math.sin(MainCharacterNormal.rotation-Math.PI/2);

	//send to the server
	SendToServer("BeMove",{"HoldInformation":dataSync[HoldID],"Position":{"x":HoldCharacterX,"y":HoldCharacterY}});
}


function MainCharacterBeMove(d)
{
	//put the position out
	var PositionX=d['x'];
	var PositionY=d['y'];
	//caculate the map position
	var MapX=parseInt(ClientWidth/2-(57/2)-PositionX);
	var MapY=parseInt(ClientHeight/2-(67/2)-PositionY);
	//if not in the wall or out of the map, move yourself
	if(!(parseInt(PositionX)>=6195)&&
	   !(parseInt(PositionX)>=6195)&&
	   !(parseInt(PositionX)>=6195)&&
	   !(parseInt(PositionX)>=6195)&&
	   !(parseInt(PositionX)<=5)&&
	   !(parseInt(PositionX)<=5)&&
	   !(parseInt(PositionX)<=5)&&
	   !(parseInt(PositionX)<=5)&&
	   !(parseInt(PositionY)>=3568)&&
	   !(parseInt(PositionY)>=3568)&&
	   !(parseInt(PositionY)>=3568)&&
	   !(parseInt(PositionY)>=3568)&&
	   !(parseInt(PositionY)<=0)&&
	   !(parseInt(PositionY)<=0)&&
	   !(parseInt(PositionY)<=0)&&
	   !(parseInt(PositionY)<=0)&&
	   !WallCollisionBox[parseInt(-(MapX-(ClientWidth/2-2*(57/2))))][parseInt(-(MapY-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(MapX-(ClientWidth/2)))][parseInt(-(MapY-(ClientHeight/2)))]
	 &&!WallCollisionBox[parseInt(-(MapX-(ClientWidth/2)))][parseInt(-(MapY-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(MapX-(ClientWidth/2-2*(57/2))))][parseInt(-(MapY-(ClientHeight/2)))])
	{
		Map.x=MapX;
		Map.y=MapY;
		//sync
		SendToServer("SyncData",{"name":Name,"ID":ID,"x":PositionX,"y":PositionY,"rotation":MouseAngle,"action":MainCharaLeanStatus,"type":MainCharacterType});
	}
}


//run when you put your mouse up
function TryDisHoldOtherCharacter()
{
	//if not hold anything, return
	if(!IsHold) return ;

	//cacluate the real position
	var PositionX;
	var PositionY;
	PositionX=parseInt(ClientWidth/2-(57/2)-Map.x);
	PositionY=parseInt(ClientHeight/2-(67/2)-Map.y);

	//put the behold player out 110px to let you hard rehold again
	var HoldCharacterX=PositionX+110*Math.cos(MainCharacterNormal.rotation-Math.PI/2);
	var HoldCharacterY=PositionY+110*Math.sin(MainCharacterNormal.rotation-Math.PI/2);

	//let behold player move
	SendToServer("BeMove",{"HoldInformation":dataSync[HoldID],"Position":{"x":HoldCharacterX,"y":HoldCharacterY}});

	//send to the behold player let him be able to control himself again
	SendToServer("DisHold",dataSync[HoldID]);

	//change some value
	IsHold=false;
	HoldID=0;
}