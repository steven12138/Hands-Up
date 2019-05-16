var DeltaX=0;  //player X Delta
var DeltaY=0;  //player Y Delta
var MouseAngle=0;  //player rotation angle
var MainCharaLeanStatus=false;
var show=false

if(window.event)
{
	alert("Do not use IE");
}

//function will run when keydown
function keydown(event)
{
	var KeyNum;
	KeyNum=event.which;//get keyname
	var KeyName=String.fromCharCode(KeyNum);
	//change DeltaX and DeltaY
	if(KeyName=='w')
		DeltaY=-5;
	if(KeyName=='s')
		DeltaY=5;
	if(KeyName=='a')
		DeltaX=-5;
	if(KeyName=='d')
		DeltaX=5;
	if(KeyName=='W')
		DeltaY=-5;
	if(KeyName=='S')
		DeltaY=5;
	if(KeyName=='A')
		DeltaX=-5;
	if(KeyName=='D')
		DeltaX=5;
	if(KeyName=='F')
		show=true;
}

//the function will run when key up
function keyup(event)
{
	var KeyNum;
	KeyNum=event.which;
	if(KeyNum>91)
		KeyNum-=32;
	KeyNum=String.fromCharCode(KeyNum);
	//get key name
	//set delta to 0 to stop the charactor move.
	if(KeyNum=='W'||KeyNum=='S')
		DeltaY=0;
	if(KeyNum=='A'||KeyNum=='D')
		DeltaX=0;
	if(KeyNum=='F')
		show=false;
}


//using atan to caculate the angle the charactor should rotate.
function GetMouseAngle(event) {
	var MouseX=event.clientX;
	var MouseY=event.clientY;
	var LenX=MouseX-(ClientWidth/2-(57/2));
	var LenY=MouseY-(ClientHeight/2-(67/2));
	var TanMouseAngle=LenX*1.0/LenY;
	MouseAngle=-Math.atan(TanMouseAngle);
	if(MouseY>(ClientHeight/2-(67/2)))
		MouseAngle+=Math.PI;
}
//change lean status
function MouseDown(event)
{
	MainCharaLeanStatus=true;
	TryHoldOtherCharacter();
}

function MouseUp(event)
{
	MainCharaLeanStatus=false;
	TryDisHoldOtherCharacter();
}