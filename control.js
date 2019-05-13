var DeltaX=0;
var DeltaY=0;
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