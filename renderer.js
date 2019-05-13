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

PIXI.loader
	.add("police-normal","Image/MainChara-police-normal.png")
	.add("police-lean","Image/MainChara-police-lean.png")
	.add("thief-normal","Image/MainChara-thief-normal.png")
	.add("theif-lean","Image/MainChara-thief-lean.png")
	.add("Map","Image/Map.png")
	.load(setup);

function setup()
{
	AddMap();
	AddMainCharacter();
	app.ticker.add(delta=>GameLoop(delta))
}

function AddMap()
{
	Map = new PIXI.Sprite(PIXI.Texture.fromImage("Map"));
	app.stage.addChild(Map);
}

function AddMainCharacter()
{
	MainCharacter = new PIXI.Sprite(PIXI.Texture.fromImage("police-normal"));
	MainCharacter.anchor.x=0.5;
	MainCharacter.anchor.y=0.5;
	MainCharacter.x=ClientWidth/2-(57/2);
	MainCharacter.y=ClientHeight/2-(67/2);
  	app.stage.addChild(MainCharacter);
}

function GameLoop(delta)
{
	MoveMainCharacter();
	UpdateMainCharacterRotate();
}

function UpdateMainCharacterRotate()
{
	MainCharacter.rotation=MouseAngle;
}

function MoveMainCharacter()
{
	Map.x-=DeltaX;
	Map.y-=DeltaY;
}