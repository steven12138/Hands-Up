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
	.add("Map","Image/testmap.png")
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
	MainCharacter.x=ClientWidth/2-67;
	MainCharacter.y=ClientHeight/2-57;
  	app.stage.addChild(MainCharacter);
}

function GameLoop(delta)
{
	MoveMainCharacter();
}

function MoveMainCharacter()
{
	Map.x-=DeltaX;
	Map.y-=DeltaY;
}