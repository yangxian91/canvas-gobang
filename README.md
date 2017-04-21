# canvas-gobang
五子棋游戏

根据慕课网教程，打的代码，稍有改动，可以很好的运行。

//画黑白子  颜色渐变

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
