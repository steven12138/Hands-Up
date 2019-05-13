var MainCharacterX=100;
var MainCharacterY=100;
var ClientWidth = document.body.clientWidth;
var ClientHeight = document.body.clientHeight;
let app = new PIXI.Application({
	width: ClientWidth,
	height: ClientHeight,
	transparent: true,
});
document.body.appendChild(app.view);

let MainCharacter;
let Map;

//load texture
PIXI.loader
	.add("police-normal","Image/MainChara-police-normal.png")
	.add("police-lean","Image/MainChara-police-lean.png")
	.add("thief-normal","Image/MainChara-thief-normal.png")
	.add("theif-lean","Image/MainChara-thief-lean.png")
	.add("Map","Image/Map.png")
	.load(setup); //run setup() after finish loading



function setup()
{
	AddMap();  //add map to the webside
	AddMainCharacter();//add character to the webside
	app.ticker.add(delta=>GameLoop(delta)) //run gameloop() in each 1/60 sec
}

function AddMap()
{
	Map = new PIXI.Sprite(PIXI.Texture.fromImage("Map"));//new PIXI object
	app.stage.addChild(Map);//add to the app
}

function AddMainCharacter()
{
	MainCharacter = new PIXI.Sprite(PIXI.Texture.fromImage("police-normal"));//new PIXI object
	MainCharacter.anchor.x=0.5;//set anchor
	MainCharacter.anchor.y=0.5;
	MainCharacter.x=ClientWidth/2-(57/2);//set position
	MainCharacter.y=ClientHeight/2-(67/2);
  	app.stage.addChild(MainCharacter);//add to the app
}


//gameloop will run each 1/60 sec
function GameLoop(delta)
{
	MoveMainCharacter();
	UpdateMainCharacterRotate();
}


//let the character face to your mouse
function UpdateMainCharacterRotate()
{
	MainCharacter.rotation=MouseAngle;
}

//move map to let player think the main character is moving
function MoveMainCharacter()
{
	Map.x-=DeltaX;
	Map.y-=DeltaY;
}