//get client size
var MainCharacterX=100;
var MainCharacterY=100;
var ClientWidth = document.body.clientWidth;
var ClientHeight = document.body.clientHeight;
var Sqrt_2=Math.sqrt(2);
var Type=Math.floor((Math.random()*2)+1);
if(Type==1)
var MainCharacterType="police";
else
var MainCharacterType="thief";

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
	app.stage.addChild(Map);//add to the app
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
	MoveMainCharacter();
	UpdateMainCharacterRotate();
	ChangeMainCharacterAction();
}

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

//move map to let player think the main character is moving
function MoveMainCharacter()
{
	if(DeltaX&&DeltaY)
	{
		if(DeltaY>0)
			DeltaY=5*Sqrt_2/2;
		else
			DeltaY=-(5*Sqrt_2/2);
		if(DeltaX>0)
			DeltaX=5*Sqrt_2/2;
		else
			DeltaX=-(5*Sqrt_2/2);
	}

	//if go x will get into the wall, stop the require
	if(!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2)))][parseInt(-(Map.y-(ClientHeight/2)))]
	 &&!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2)))][parseInt(-(Map.y-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-DeltaX-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-(ClientHeight/2)))])
	{
		Map.x-=DeltaX;
	}

	//if go y will get into the wall, stop the require
	if(!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2)))][parseInt(-(Map.y-DeltaY-(ClientHeight/2)))]
	 &&!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2)))][parseInt(-(Map.y-DeltaY-(ClientHeight/2-2*(67/2))))]
	 &&!WallCollisionBox[parseInt(-(Map.x-(ClientWidth/2-2*(57/2))))][parseInt(-(Map.y-DeltaY-(ClientHeight/2)))])
	{
		Map.y-=DeltaY;
	}
}