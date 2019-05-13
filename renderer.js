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

PIXI.loader
	.add("police-normal","Image/MainChara-police-normal.png")
	.load(setup);

function setup()
{
	AddMainCharacter();
	app.ticker.add(delta=>GameLoop(delta))
}

function AddMainCharacter()
{
	MainCharacter = new PIXI.Sprite(PIXI.Texture.fromImage("police-normal"));
  	app.stage.addChild(MainCharacter);
}

function GameLoop(delta)
{
	MoveMainCharacter();
}

function MoveMainCharacter()
{
	MainCharacter.x+=DeltaX;
	MainCharacter.y+=DeltaY;
}