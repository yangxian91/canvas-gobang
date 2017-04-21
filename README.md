# canvas-gobang
五子棋游戏
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
