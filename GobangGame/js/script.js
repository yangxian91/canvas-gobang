var me = true;
var gameover = false;

var chessBoard = [];
var rowNum = 15;
var size = 30;  //棋盘格子大小
var left = 15; 
var smallsize = 5; //棋盘上五个小黑点半径
var pieceSize = 13;  //棋子半径

var wins = []; //赢法数字，三维

//赢法统计数组
var mywin = [];
var computerwin = [];

for (var i = 0; i < rowNum; i++) {
	chessBoard[i] = [];
	for(var j=0; j<rowNum; j++){
		chessBoard[i][j] = 0;
	}
}


for (var i = 0; i < rowNum; i++) {
	wins[i] = [];
	for(var j = 0; j < rowNum; j++){
		wins[i][j] = [];
	}
}

//赢法种类
var count = 0;
//列向赢法
//wins[0][0][0] = true;
//wins[0][1][0] = true;
//wins[0][2][0] = true;
//wins[0][3][0] = true;
//wins[0][4][0] = true;

//wins[0][1][1] = true;
//wins[0][2][1] = true;
//wins[0][3][1] = true;
//wins[0][4][1] = true;
//wins[0][5][1] = true;

for (var i = 0; i < 15; i++) {
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count ++;
	}
}
//横向赢法
for (var i = 0; i < 15; i++) {
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count ++;
	}
}
//斜线
for (var i = 0; i < 11; i++) {
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count ++;
	}
}
//反斜线
for (var i = 0; i < 11; i++) {
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count ++;
	}
}

console.log(count);

for (var i = 0; i < count; i++) {
	mywin[i] = 0;
	computerwin[i] = 0;
}


window.onload = function(){
	var canvas = document.getElementById("chess");
	var context = canvas.getContext("2d");
	
	//画棋盘
	drawChess();
	
	function drawChess(){
		context.strokeStyle = "#090513";
		context.fillStyle = "#090513";
		for (var i = 0; i < rowNum; i++) {
			context.moveTo(left + i*size, 15);
			context.lineTo(left + i*size, 435);
			context.stroke();
			context.moveTo(15, left + i*size);
			context.lineTo(435, left + i*size);
			context.stroke();
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText(i, 5, left+i*size);
		}
		context.beginPath();
		context.arc(left + 3*size, left + 3*size, smallsize, 0, Math.PI*2);
		context.fill();
		context.beginPath();
		context.arc(left + 11*size, left + 11*size, smallsize, 0, Math.PI*2);
		context.fill();
		context.beginPath();
		context.arc(left + 3*size, left + 11*size, smallsize, 0, Math.PI*2);
		context.fill();
		context.beginPath();
		context.arc(left + 11*size, left + 3*size, smallsize, 0, Math.PI*2);
		context.fill();
		context.beginPath();
		context.arc(left + 7*size, left + 7*size, smallsize, 0, Math.PI*2);
		context.fill();
	}
	
	//黑白子
	function oneStep(i, j, me){
		context.beginPath();
		context.arc(left + i*size, left + j*size, pieceSize, 0, Math.PI*2);
		context.closePath();
		var gradient = context.createRadialGradient(left + i*size+2, left + j*size-2, pieceSize, left + i*size+2, left + j*size-2, 0);
		if(me){
			gradient.addColorStop(0, "#0a0a0a");
			gradient.addColorStop(1, "#636766");
		}else{
			gradient.addColorStop(0, "#d1d1d1");
			gradient.addColorStop(1, "#f9f9f9");
		}
		
		context.fillStyle = gradient;
		context.fill();
	}
	
	//点击，落子
	canvas.onclick = function(e){
		if(gameover) return;
		if(!me) return;
		
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x/size);
		var j = Math.floor(y/size);
		if(chessBoard[i][j] == 0){
			oneStep(i, j, me);
			chessBoard[i][j] = 1;
			
			for (var k = 0; k < count; k++) {
				if(wins[i][j][k]){  //第k种赢法，ij位置为true
					mywin[k] ++;
					computerwin[k] = 6;
					if(mywin[k] == 5){
						window.alert('You are winner!');
						gameover = true;
					}
				}
			}
			
			if(!gameover){
				me = !me;
				computerAI();
			}
		}
		
	}
	
	function computerAI(){
		var myScore = [];
		var computerScore = [];
		var max = 0;
		var u=0, v=0;
		
		for (var i = 0; i < 15; i++) {
			myScore[i] = [];
			computerScore[i] = [];
			for(var j=0; j<15; j++){
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		
		for (var i = 0; i < 15; i++) {
			for(var j=0; j<15; j++){
				if(chessBoard[i][j] == 0){
					for(var k=0; k<count; k++){
						if(wins[i][j][k]){
							if(mywin[k] == 1){
								myScore[i][j] += 200;
							}else if(mywin[k] == 2){
								myScore[i][j] += 400;
							}else if(mywin[k] == 3){
								myScore[i][j] += 2000;
							}else if(mywin[k] == 4){
								myScore[i][j] += 10000;
							}
							
							if(computerwin[k] == 1){
								computerScore[i][j] += 220;
							}else if(computerwin[k] == 2){
								computerScore[i][j] += 420;
							}else if(computerwin[k] == 3){
								computerScore[i][j] += 2100;
							}else if(computerwin[k] == 4){
								computerScore[i][j] += 20000;
							}
							
						}
					}
					//我的分数高，拦截， 电脑已经要赢了
					if(myScore[i][j] >max){
						max = myScore[i][j];
						u = i;
						v = j;
						
					}else if(myScore[i][j] == max){
						if(computerScore[i][j] > computerScore[u][v]){
							u = i;
							v = j;
						}
					}
					
					if(computerScore[i][j] >max){
						max = computerScore[i][j];
						u = i;
						v = j;
						
					}else if(computerScore[i][j] == max){
						if(myScore[i][j] > myScore[u][v]){
							u = i;
							v = j;
						}
					}
				}
			}
		}
		
		oneStep(u, v, false);
		chessBoard[u][v] = 2;
		for (var k = 0; k < count; k++) {
				if(wins[u][v][k]){  //第k种赢法，ij位置为true
					mywin[k] = 6;
					computerwin[k] ++;
					if(computerwin[k] == 5){
						window.alert('Computer is winner!');
						gameover = true;
					}
				}
			}
			
			if(!gameover){
				me = !me;
			}
	}
	
}
