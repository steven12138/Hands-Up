var WallCollisionBox = new Array();
for(var i=0;i<=6200;i++)
{
	WallCollisionBox[i]=new Array(i);
	for(var j=0;j<=3568;j++)
	{
		WallCollisionBox[i][j]=0;
	}
}
for(var i=750;i<=1057;i++)
	for(var j=357;j<=1994;j++)
		WallCollisionBox[i][j]=1;

for(var i=147;i<=1057;i++)
	for(var j=1092;j<=1268;j++)
		WallCollisionBox[i][j]=1;

for(var i=748;i<=1858;i++)
	for(var j=1724;j<=1996;j++)
		WallCollisionBox[i][j]=1;

for(var i=1700;i<=1839;i++)
	for(var j=2177;j<=2947;j++)
		WallCollisionBox[i][j]=1;

for(var i=2773;i<=2953;i++)
	for(var j=1976;j<=2875;j++)
		WallCollisionBox[i][j]=1;

for(var i=1708;i<=1846;i++)
	for(var j=3057;j<=3568;j++)
		WallCollisionBox[i][j]=1;

for(var i=1272;i<=2174;i++)
	for(var j=731;j<=896;j++)
		WallCollisionBox[i][j]=1;


for(var i=2346;i<=3221;i++)
	for(var j=713;j<=893;j++)
		WallCollisionBox[i][j]=1;

for(var i=2770;i<=2952;i++)
	for(var j=893;j<=1792;j++)
		WallCollisionBox[i][j]=1;

for(var i=3212;i<=3397;i++)
	for(var j=268;j<=1167;j++)
		WallCollisionBox[i][j]=1;

for(var i=4375;i<=4586;i++)
	for(var j=463;j<=1842;j++)
		WallCollisionBox[i][j]=1;

for(var i=4270;i<=6200;i++)
	for(var j=2658;j<=2992;j++)
		WallCollisionBox[i][j]=1;

for(var i=5190;i<=5411;i++)
	for(var j=0;j<=811;j++)
		WallCollisionBox[i][j]=1;

for(var i=5190;i<=5410;i++)
	for(var j=985;j<=2033;j++)
		WallCollisionBox[i][j]=1;