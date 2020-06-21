
var pic = {
	r_box: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB+ElEQVRYR+2YvUrDUBiGn+LgKJkcBIcKzkJ0EYoK9Q4s3oBkcipCRXBSpELJBfQW4h3oIBRE0HoBgg5uglC66VCQL8lpT9PfY5O6nEBocvLlnCdvvgbeN0dvc7Rj/bA1YnzW4bHr5eLZpUjfFYz8qn1WEP1+fS0Zl3N9rZaAhUX38LaQWPoTgg+ol+EuTSofiqvgLUNJn7cD7MKaQCqwfAOeVVEbWq8QlOE6S8V8qKxDaSkSJ9wKsAm8KzC3AbdyQaAeILiCuhTEYGkKpuYSmPwZeNsaXAH2gWafYnOEGgmXVCx8lU9RP4lSzSwkGjOn64O3BV4SzLmB6gGcZtRT0zxnXmfofi58cMuRUll9tybBOTqDApt009yvWzBTya1iVjFTBUzrbY9ZxUwVMK23PWYVM1XAtN72mFXMVAGD+tCV6z2mbLrBHOmWivFtR1N2wZwLcM//14xwAsVazNDNLmLrJJFAlu57nMQD9i206prhDUg5RJnihYt1qw4zvCFYIiKYixuXvjqC6l6cX0wTqohymRrgRcgfQ0VBxWnPYKiiJO9A6yWKoSTHEGcufZf25l5CZQOK42KoMLhLrvwFwSPUa70/xMzxgUAcQnEHSiuJ4E7W14M7OZ8UdaqaPysnQN/g/PQ/vQrshkadqnQe4fCoNXTc8K38AoPFmvOMEA9cAAAAAElFTkSuQmCC",
}

window.chess = {}

//二维数组克隆
chess.arrClone = function (arr) {
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		newArr[i] = arr[i].slice();
	}
	return newArr;
}


chess.value = {

	//车价值
	c: [
		[206, 208, 207, 213, 214, 213, 207, 208, 206],
		[206, 212, 209, 216, 233, 216, 209, 212, 206],
		[206, 208, 207, 214, 216, 214, 207, 208, 206],
		[206, 213, 213, 216, 216, 216, 213, 213, 206],
		[208, 211, 211, 214, 215, 214, 211, 211, 208],

		[208, 212, 212, 214, 215, 214, 212, 212, 208],
		[204, 209, 204, 212, 214, 212, 204, 209, 204],
		[198, 208, 204, 212, 212, 212, 204, 208, 198],
		[200, 208, 206, 212, 200, 212, 206, 208, 200],
		[194, 206, 204, 212, 200, 212, 204, 206, 194]
	],

	//马价值
	m: [
		[90, 90, 90, 96, 90, 96, 90, 90, 90],
		[90, 96, 103, 97, 94, 97, 103, 96, 90],
		[92, 98, 99, 103, 99, 103, 99, 98, 92],
		[93, 108, 100, 107, 100, 107, 100, 108, 93],
		[90, 100, 99, 103, 104, 103, 99, 100, 90],

		[90, 98, 101, 102, 103, 102, 101, 98, 90],
		[92, 94, 98, 95, 98, 95, 98, 94, 92],
		[93, 92, 94, 95, 92, 95, 94, 92, 93],
		[85, 90, 92, 93, 78, 93, 92, 90, 85],
		[88, 85, 90, 88, 90, 88, 90, 85, 88]
	],

	//相价值
	x: [
		[0, 0, 20, 0, 0, 0, 20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 23, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 20, 0, 0, 0, 20, 0, 0],

		[0, 0, 20, 0, 0, 0, 20, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18, 0, 0, 0, 23, 0, 0, 0, 18],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 20, 0, 0, 0, 20, 0, 0]
	],

	//士价值
	s: [
		[0, 0, 0, 20, 0, 20, 0, 0, 0],
		[0, 0, 0, 0, 23, 0, 0, 0, 0],
		[0, 0, 0, 20, 0, 20, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],

		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 20, 0, 20, 0, 0, 0],
		[0, 0, 0, 0, 23, 0, 0, 0, 0],
		[0, 0, 0, 20, 0, 20, 0, 0, 0]
	],

	//将价值
	j: [
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],

		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
		[0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
	],

	//炮价值
	p: [

		[100, 100, 96, 91, 90, 91, 96, 100, 100],
		[98, 98, 96, 92, 89, 92, 96, 98, 98],
		[97, 97, 96, 91, 92, 91, 96, 97, 97],
		[96, 99, 99, 98, 100, 98, 99, 99, 96],
		[96, 96, 96, 96, 100, 96, 96, 96, 96],

		[95, 96, 99, 96, 100, 96, 99, 96, 95],
		[96, 96, 96, 96, 96, 96, 96, 96, 96],
		[97, 96, 100, 99, 101, 99, 100, 96, 97],
		[96, 97, 98, 98, 98, 98, 98, 97, 96],
		[96, 96, 97, 99, 99, 99, 97, 96, 96]
	],

	//卒价值
	b: [
		[9, 9, 9, 11, 13, 11, 9, 9, 9],
		[19, 24, 34, 42, 44, 42, 34, 24, 19],
		[19, 24, 32, 37, 37, 37, 32, 24, 19],
		[19, 23, 27, 29, 30, 29, 27, 23, 19],
		[14, 18, 20, 27, 29, 27, 20, 18, 14],

		[7, 0, 13, 0, 16, 0, 13, 0, 7],
		[7, 0, 7, 0, 15, 0, 7, 0, 7],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}

//黑子为红字价值位置的倒置
chess.value.C = chess.arrClone(chess.value.c).reverse();
chess.value.M = chess.arrClone(chess.value.m).reverse();
chess.value.X = chess.value.x;
chess.value.S = chess.value.s;
chess.value.J = chess.value.j;
chess.value.P = chess.arrClone(chess.value.p).reverse();
chess.value.B = chess.arrClone(chess.value.b).reverse();


window.getAllMovePosition = {
	b: function (id, x, y) {
		var d = []
		//向上检索
		if (x - 1 >= 0 && (!chessBoard[x - 1][y] || !isSameGroup(id, chessBoard[x - 1][y]))) {
			d.push([x - 1, y])
		}
		if (x < 5) {
			if (y - 1 >= 0 && (!chessBoard[x][y - 1] || !isSameGroup(id, chessBoard[x][y - 1]))) {
				d.push([x, y - 1])
			}
			if (y + 1 <= 8 && (!chessBoard[x][y + 1] || !isSameGroup(id, chessBoard[x][y + 1]))) {
				d.push([x, y + 1])
			}
		}
		return d
	},
	B: function (id, x, y) {
		var d = []
		//向下检索
		if (x + 1 <= 9 && (!chessBoard[x + 1][y] || !isSameGroup(id, chessBoard[x + 1][y]))) {
			d.push([x + 1, y])
		}
		if (x > 4) {
			if (y - 1 >= 0 && (!chessBoard[x][y - 1] || !isSameGroup(id, chessBoard[x][y - 1]))) {
				d.push([x, y - 1])
			}
			if (y + 1 <= 8 && (!chessBoard[x][y + 1] || !isSameGroup(id, chessBoard[x][y + 1]))) {
				d.push([x, y + 1])
			}
		}
		return d
	},
	s: function (id, x, y) {
		var d = [];
		//4点半
		if (x + 1 <= 9 && y + 1 <= 5 && (!chessBoard[x + 1][y + 1] || !isSameGroup(id, chessBoard[x + 1][y + 1]))) d.push([x + 1, y + 1]);
		//7点半
		if (x + 1 <= 9 && y - 1 >= 3 && (!chessBoard[x + 1][y - 1] || !isSameGroup(id, chessBoard[x + 1][y - 1]))) d.push([x + 1, y - 1]);
		//1点半
		if (x - 1 >= 7 && y + 1 <= 5 && (!chessBoard[x - 1][y + 1] || !isSameGroup(id, chessBoard[x - 1][y + 1]))) d.push([x - 1, y + 1]);
		//10点半
		if (x - 1 >= 7 && y - 1 >= 3 && (!chessBoard[x - 1][y - 1] || !isSameGroup(id, chessBoard[x - 1][y - 1]))) d.push([x - 1, y - 1]);
		return d;
	},
	S: function (id, x, y) {
		var d = [];
		//4点半
		if (x + 1 <= 2 && y + 1 <= 5 && (!chessBoard[x + 1][y + 1] || !isSameGroup(id, chessBoard[x + 1][y + 1]))) d.push([x + 1, y + 1]);
		//7点半
		if (x + 1 <= 2 && y - 1 >= 3 && (!chessBoard[x + 1][y - 1] || !isSameGroup(id, chessBoard[x + 1][y - 1]))) d.push([x + 1, y - 1]);
		//1点半
		if (x - 1 >= 0 && y + 1 <= 5 && (!chessBoard[x - 1][y + 1] || !isSameGroup(id, chessBoard[x - 1][y + 1]))) d.push([x - 1, y + 1]);
		//10点半
		if (x - 1 >= 0 && y - 1 >= 3 && (!chessBoard[x - 1][y - 1] || !isSameGroup(id, chessBoard[x - 1][y - 1]))) d.push([x - 1, y - 1]);
		return d;
	},
	x: function (id, x, y) {
		var d = [];
		//4点半
		if (x + 2 <= 9 && y + 2 <= 8 && !chessBoard[x + 1][y + 1] && (!chessBoard[x + 2][y + 2] || !isSameGroup(id, chessBoard[x + 2][y + 2]))) d.push([x + 2, y + 2]);
		//7点半
		if (x + 2 <= 9 && y - 2 >= 0 && !chessBoard[x + 1][y - 1] && (!chessBoard[x + 2][y - 2] || !isSameGroup(id, chessBoard[x + 2][y - 2]))) d.push([x + 2, y - 2]);
		//1点半
		if (x - 2 >= 5 && y + 2 <= 8 && !chessBoard[x - 1][y + 1] && (!chessBoard[x - 2][y + 2] || !isSameGroup(id, chessBoard[x - 2][y + 2]))) d.push([x - 2, y + 2]);
		//10点半
		if (x - 2 >= 5 && y - 2 >= 0 && !chessBoard[x - 1][y - 1] && (!chessBoard[x - 2][y - 2] || !isSameGroup(id, chessBoard[x - 2][y - 2]))) d.push([x - 2, y - 2]);
		return d;
	},
	X: function (id, x, y) {
		var d = [];
		//4点半
		if (x + 2 <= 4 && y + 2 <= 8 && !chessBoard[x + 1][y + 1] && (!chessBoard[x + 2][y + 2] || !isSameGroup(id, chessBoard[x + 2][y + 2]))) d.push([x + 2, y + 2]);
		//7点半
		if (x + 2 <= 4 && y - 2 >= 0 && !chessBoard[x + 1][y - 1] && (!chessBoard[x + 2][y - 2] || !isSameGroup(id, chessBoard[x + 2][y - 2]))) d.push([x + 2, y - 2]);
		//1点半
		if (x - 2 >= 0 && y + 2 <= 8 && !chessBoard[x - 1][y + 1] && (!chessBoard[x - 2][y + 2] || !isSameGroup(id, chessBoard[x - 2][y + 2]))) d.push([x - 2, y + 2]);
		//10点半
		if (x - 2 >= 0 && y - 2 >= 0 && !chessBoard[x - 1][y - 1] && (!chessBoard[x - 2][y - 2] || !isSameGroup(id, chessBoard[x - 2][y - 2]))) d.push([x - 2, y - 2]);
		return d;
	},
	j: function (id, x, y) {
		var d = [];
		var isNull = (function (x) {
			var x2 = getChessPosition(`#J1`).x
			for (var i = x - 1; i > x2; i--) {
				if (chessBoard[i][y]) return false;
			}
			return true;
		})(x);
		//下
		if (x + 1 <= 9 && (!chessBoard[x + 1][y] || !isSameGroup(id, chessBoard[x + 1][y]))) d.push([x + 1, y]);
		//上
		if (x - 1 >= 7 && (!chessBoard[x - 1][y] || !isSameGroup(id, chessBoard[x - 1][y]))) d.push([x - 1, y]);
		//老将对老将的情况
		if (getChessPosition(`#j1`).y == getChessPosition(`#J1`).y && isNull) {
			d.push([getChessPosition(`#J1`).x, y]);
		}
		//右
		if (y + 1 <= 5 && (!chessBoard[x][y + 1] || !isSameGroup(id, chessBoard[x][y + 1]))) d.push([x, y + 1]);
		//左
		if (y - 1 >= 3 && (!chessBoard[x][y - 1] || !isSameGroup(id, chessBoard[x][y - 1]))) d.push([x, y - 1]);
		return d;
	},
	J: function (id, x, y) {
		var d = [];
		var isNull = (function (x) {
			var x2 = getChessPosition(`#j1`).x
			for (var i = x + 1; i < x2; i++) {
				if (chessBoard[i][y]) return false;
			}
			return true;
		})(x);
		//下
		if (x + 1 <= 2 && (!chessBoard[x + 1][y] || !isSameGroup(id, chessBoard[x + 1][y]))) d.push([x + 1, y]);
		//上
		if (x - 1 >= 0 && (!chessBoard[x - 1][y] || !isSameGroup(id, chessBoard[x - 1][y]))) d.push([x - 1, y]);
		//老将对老将的情况
		if (getChessPosition(`#j1`).y == getChessPosition(`#J1`).y && isNull) {
			d.push([getChessPosition(`#j1`).x, y]);
		}
		//右
		if (y + 1 <= 5 && (!chessBoard[x][y + 1] || !isSameGroup(id, chessBoard[x][y + 1]))) d.push([x, y + 1]);
		//左
		if (y - 1 >= 3 && (!chessBoard[x][y - 1] || !isSameGroup(id, chessBoard[x][y - 1]))) d.push([x, y - 1]);
		return d;
	},
	p: function (id, x, y) {
		var d = [];
		//上检索
		var n = 0;
		for (var i = x - 1; i >= 0; i--) {
			if (chessBoard[i][y]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (!isSameGroup(id, chessBoard[i][y])) d.push([i, y]);
					break
				}
			} else {
				if (n == 0) d.push([i, y])
			}
		}
		//下检索
		var n = 0;
		for (var i = x + 1; i <= 9; i++) {
			if (chessBoard[i][y]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (!isSameGroup(id, chessBoard[i][y])) d.push([i, y]);
					break
				}
			} else {
				if (n == 0) d.push([i, y])
			}
		}
		//左检索
		var n = 0;
		for (var i = y - 1; i >= 0; i--) {
			if (chessBoard[x][i]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (!isSameGroup(id, chessBoard[x][i])) d.push([x, i]);
					break
				}
			} else {
				if (n == 0) d.push([x, i])
			}
		}
		//右检索
		var n = 0;
		for (var i = y + 1; i <= 8; i++) {
			if (chessBoard[x][i]) {
				if (n == 0) {
					n++;
					continue;
				} else {
					if (!isSameGroup(id, chessBoard[x][i])) d.push([x, i]);
					break
				}
			} else {
				if (n == 0) d.push([x, i])
			}
		}
		return d;
	},
	m: function (id, x, y) {
		var d = [];
		//1点
		if (x - 2 >= 0 && y + 1 <= 8 && !chessBoard[x - 1][y] && (!chessBoard[x - 2][y + 1] || !isSameGroup(id, chessBoard[x - 2][y + 1]))) d.push([x - 2, y + 1]);
		//2点
		if (x - 1 >= 0 && y + 2 <= 8 && !chessBoard[x][y + 1] && (!chessBoard[x - 1][y + 2] || !isSameGroup(id, chessBoard[x - 1][y + 2]))) d.push([x - 1, y + 2]);
		//4点
		if (x + 1 <= 9 && y + 2 <= 8 && !chessBoard[x][y + 1] && (!chessBoard[x + 1][y + 2] || !isSameGroup(id, chessBoard[x + 1][y + 2]))) d.push([x + 1, y + 2]);
		//5点
		if (x + 2 <= 9 && y + 1 <= 8 && !chessBoard[x + 1][y] && (!chessBoard[x + 2][y + 1] || !isSameGroup(id, chessBoard[x + 2][y + 1]))) d.push([x + 2, y + 1]);
		//7点
		if (x + 2 <= 9 && y - 1 >= 0 && !chessBoard[x + 1][y] && (!chessBoard[x + 2][y - 1] || !isSameGroup(id, chessBoard[x + 2][y - 1]))) d.push([x + 2, y - 1]);
		//8点
		if (x + 1 <= 9 && y - 2 >= 0 && !chessBoard[x][y - 1] && (!chessBoard[x + 1][y - 2] || !isSameGroup(id, chessBoard[x + 1][y - 2]))) d.push([x + 1, y - 2]);
		//10点
		if (x - 1 >= 0 && y - 2 >= 0 && !chessBoard[x][y - 1] && (!chessBoard[x - 1][y - 2] || !isSameGroup(id, chessBoard[x - 1][y - 2]))) d.push([x - 1, y - 2]);
		//11点
		if (x - 2 >= 0 && y - 1 >= 0 && !chessBoard[x - 1][y] && (!chessBoard[x - 2][y - 1] || !isSameGroup(id, chessBoard[x - 2][y - 1]))) d.push([x - 2, y - 1]);

		return d;
	},
	c: function (id, x, y) {
		var d = [];
		//上检索
		for (var i = x - 1; i >= 0; i--) {
			if (!chessBoard[i][y]) {
				d.push([i, y])
				continue
			} else if (!isSameGroup(id, chessBoard[i][y])) {
				d.push([i, y]);
			}
			break
		}
		//下检索
		for (var i = x + 1; i <= 9; i++) {
			if (!chessBoard[i][y]) {
				d.push([i, y])
				continue
			} else if (!isSameGroup(id, chessBoard[i][y])) {
				d.push([i, y]);
			}
			break
		}
		//左检索
		for (var i = y - 1; i >= 0; i--) {
			if (!chessBoard[x][i]) {
				d.push([x, i])
				continue
			} else if (!isSameGroup(id, chessBoard[x][i])) {
				d.push([x, i]);
			}
			break
		}
		//右检索
		for (var i = y + 1; i <= 8; i++) {
			if (!chessBoard[x][i]) {
				d.push([x, i])
				continue
			} else if (!isSameGroup(id, chessBoard[x][i])) {
				d.push([x, i]);
			}
			break
		}
		return d;
	},
}

var isSameGroup = function (id, chessBoardID) {
	return (!chessBoardID.match(/[A-Z]/)) == (!id.match(/[A-Z]/))
}

window.indexOfMove = function (ps, xy) {
	for (var i = 0; i < ps.length; i++) {
		if (ps[i][0] == xy[0] && ps[i][1] == xy[1]) return true;
	}
	return false;
}

window.chessType = function (id) {
	var chessTypes = id.match(/[a-zA-Z]/)[0].toLowerCase()
	if (chessTypes == `c` || chessTypes == `m` || chessTypes == `p`) {
		return chessTypes
	}

	if (!id.match(/[a-z]/)) {
		if (!message.player) {
			return id.match(/[A-Z]/)[0].toLowerCase()
		} else {
			return id.match(/[A-Z]/)[0]
		}

	} else {
		if (!message.player) {
			return id.match(/[a-z]/)[0].toUpperCase()
		} else {
			return id.match(/[a-z]/)[0]
		}
	}
}

window.chessMove = function (x, y, player, opponent) {

	if (player == true) {
		boxID1 = `#r_box1`
		boxID2 = `#r_box2`
		boxID3 = `#r_box3`
		anotherBoxID1 = `#b_box1`
		anotherBoxID2 = `#b_box2`
		anotherBoxID3 = `#b_box3`
	} else {
		boxID1 = `#b_box1`
		boxID2 = `#b_box2`
		boxID3 = `#b_box3`
		anotherBoxID1 = `#r_box1`
		anotherBoxID2 = `#r_box2`
		anotherBoxID3 = `#r_box3`
	}

	console.log(`chess move`, getChessPosition(chooseID).x, getChessPosition(chooseID).y, `to `, chooseID, x, y)

	chessCharacter = !chessCharacter
	console.log(`=========================棋手回合轮换=====================`, x, y)

	if ((opponent == 1 && player) || (opponent == 0 && !player)) { //对手走红棋 自己走黑棋 只有在黑方才需要转置
		console.log(`opponent`, opponent, `player`, player, `================666666`)
		$(boxID2).css({
			"display": "block",
			"top": height * Math.abs(9 - getChessPosition(chooseID).x) + `px`,
			"left": width * Math.abs(8 - getChessPosition(chooseID).y) + `px`
		})
		regretObj.setData(chooseID, Math.abs(9 - getChessPosition(chooseID).x), Math.abs(8 - getChessPosition(chooseID).y),
			x, y, boxID1, boxID2, anotherBoxID1, anotherBoxID2, chessBoard[x][y] || killID)
	} else {
		console.log(`opponent`, opponent, `player`, player, `================555555`)
		$(boxID2).css({
			"display": "block",
			"top": height * getChessPosition(chooseID).x + `px`,
			"left": width * getChessPosition(chooseID).y + `px`
		})
		regretObj.setData(chooseID, getChessPosition(chooseID).x, getChessPosition(chooseID).y,
			x, y, boxID1, boxID2, anotherBoxID1, anotherBoxID2, chessBoard[x][y] || killID)
	}

	console.log(regretObj.data)
	// regretObj.setData(chooseID, getChessPosition(chooseID).x, getChessPosition(chooseID).y,
	// 	x, y, boxID1, boxID2, anotherBoxID1, anotherBoxID2, killID)

	$(chooseID).css({
		"top": height * x + `px`,
		"left": width * y + `px`
	})
	$(boxID1).css({
		"display": "block",
		"top": height * x + `px`,
		"left": width * y + `px`
	})

	$(boxID3).css({
		"display": "none",
	})
	$(anotherBoxID1).css({
		"display": "none",
	})
	$(anotherBoxID2).css({
		"display": "none",
	})
	$(anotherBoxID3).css({
		"display": "none",
	})

	if (!!chessBoard[x][y]) {
		if (chessBoard[x][y] == `#J1`) {
			console.log(chessBoard[x][y], x, y)
			alert(`红棋胜利！`)
		} else if (chessBoard[x][y] == `#j1`) {
			console.log(chessBoard[x][y], x, y)
			alert(`黑棋胜利！`)
		}
		$(chessBoard[x][y]).hide()
		console.log(`jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj kill`, killID, `===kk==`, chessBoard[x][y])
	}



	if ((opponent == 1 && player) || (opponent == 0 && !player)) {
		chessBoard[Math.abs(9 - getChessPosition(chooseID).x)][Math.abs(8 - getChessPosition(chooseID).y)] = ``
		setChessPosition(chooseID, Math.abs(9 - x), Math.abs(8 - y))
	} else {
		chessBoard[getChessPosition(chooseID).x][getChessPosition(chooseID).y] = ``
		setChessPosition(chooseID, x, y)
	}
	// setChessPosition(chooseID, x, y)
	console.log(x, y, getChessPosition(chooseID).x, getChessPosition(chooseID).y)
	chessBoard[x][y] = chooseID

	chessClickStatus = 0
	chooseID = ``
	killID = ``
	console.log(`将chooseID置空,更新chessposition和chessboard`, chessBoard)
}

window.canChessOperation = function () {
	if (!chooseID) return false
	if (!chessCharacter) return false
	console.log(chooseID, message.player)
	if (message.player) {
		if (!chooseID.match(/[a-z]/)) {
			console.log(`你不能操作该棋子`)
			return false
		}
	} else {
		if (!chooseID.match(/[A-Z]/)) {
			console.log(`你不能操作该棋子`)
			return false
		}
	}
	return true
}