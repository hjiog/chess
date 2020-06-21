window.AI =  {};

//取得棋盘上所有棋子
AI.getMapAllMan = function (camp) {
	var mans = [];
	var str;
	// if ((camp & 1) == 0) {
	if (camp) {
		str = /[a-z]/
	} else {
		str = /[A-Z]/
	}
	for (var i = 0; i < chessBoard.length; i++) {
		for (var n = 0; n < chessBoard[i].length; n++) {
			var key = chessBoard[i][n];
			if (key && !!key.match(str)) {
				// play.mans[key].x = n;
				// play.mans[key].y = i;
				// mans.push(play.mans[key])
				mans.push([key, i, n])
			}
		}
	}
	return mans;
}

//取得棋谱所有己方棋子的着法
AI.getMoves = function (camp) {
	var manArr = AI.getMapAllMan(camp);
	var moves = [];
	// var foul = play.isFoul;
	for (var i = 0; i < manArr.length; i++) {
		var man = manArr[i];
		var val = getAllMovePosition[chessType(man[0])](man[0], man[1], man[2])
		for (var n = 0; n < val.length; n++) {
			var x = man[1];
			var y = man[2];
			var newX = val[n][0];
			var newY = val[n][1];
			//如果不是长将着法
			// if (foul[0] != x || foul[1] != y || foul[2] != newX || foul[3] != newY) {
			// 	moves.push([x, y, newX, newY, man.key])
			// }
			moves.push([x, y, newX, newY, man[0]])
		}
	}
	return moves;
}

//评估棋局 取得棋盘双方棋子价值差
AI.evaluate = function () {
	var val = 0;
	for (var i = 0; i < chessBoard.length; i++) {
		for (var n = 0; n < chessBoard[i].length; n++) {
			var key = chessBoard[i][n];
			if (key) {
				var temp = key.match(/[a-z]/)
				if (!temp) {
					temp = key.match(/[A-Z]/)
					// console.log(chess.value[temp[0]],`0000000000000`,temp[0])
					val -= chess.value[temp[0]][i][n]
				} else {
					val += chess.value[temp[0]][i][n]
				}
			}
		}
	}
	//val+=Math.floor( Math.random() * 10);  //让AI走棋增加随机元素
	//com.show()
	//z(val*my)
	AI.number++;
	return val;
}


