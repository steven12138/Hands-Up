var DeltaX=0;
var DeltaY=0;
var MouseAngle=0;
if(window.event)
{
	alert("Do not use IE");
}
function keydown(event)
{
	var KeyNum;
	KeyNum=event.which;
	var KeyName=String.fromCharCode(KeyNum);
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
}
function keyup(event)
{
	var KeyNum;
	KeyNum=event.which;
	if(KeyNum>91)
		KeyNum-=32;
	KeyNum=String.fromCharCode(KeyNum);
	if(KeyNum=='W'||KeyNum=='S')
		DeltaY=0;
	if(KeyNum=='A'||KeyNum=='D')
		DeltaX=0;
}

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