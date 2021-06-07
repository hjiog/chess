"use strict";
exports.__esModule = true;
exports.setBestMove = exports.getBestMove = exports.historyTable = exports.checkedIsDead = exports.canChessMove = exports.setPostion = exports.getEvaluateValue = void 0;
var common_1 = require("~/common");
// 评估棋局 取得棋盘双方棋子价值差，电脑越优势则返回值越大
function getEvaluateValue(chessboardMap) {
    var val = 0;
    if (!common_1.Store.isPlayFirst) {
        // 电脑先手,红方优势则返回值越大
        chessboardMap.forEach(function (row, top) {
            row.forEach(function (col, left) {
                if (col & common_1.ChessTypeEnum.red)
                    val += common_1.ChessMap[col].valueMap[top][left];
                else if (col & common_1.ChessTypeEnum.black)
                    val -= common_1.ChessMap[col].valueMap[top][left];
            });
        });
    }
    else {
        // 玩家先手,红方优势则返回值越小
        chessboardMap.forEach(function (row, top) {
            row.forEach(function (col, left) {
                if (col & common_1.ChessTypeEnum.red)
                    val -= common_1.ChessMap[col].valueMap[top][left];
                else if (col & common_1.ChessTypeEnum.black)
                    val += common_1.ChessMap[col].valueMap[top][left];
            });
        });
    }
    // debugger
    // console.log(val, '========')
    return val;
}
exports.getEvaluateValue = getEvaluateValue;
// 记录杀死的棋子，用于回退
var killedChess = [];
function setPostion(props) {
    var originPostion = props.originPostion, currentPostion = props.currentPostion, back = props.back, chessboardMap = props.chessboardMap;
    var currentChess = chessboardMap[originPostion.top][originPostion.left];
    var killingChess = chessboardMap[currentPostion.top][currentPostion.left];
    chessboardMap[currentPostion.top][currentPostion.left] = currentChess;
    // 回退
    if (back) {
        var preChess = killedChess.pop();
        chessboardMap[originPostion.top][originPostion.left] = preChess || 0;
    }
    else {
        killedChess.push(killingChess);
        chessboardMap[originPostion.top][originPostion.left] = 0;
    }
}
exports.setPostion = setPostion;
exports.canChessMove = function (type, willFindRedCamp) { return willFindRedCamp ? (type & common_1.ChessTypeEnum.red) : (type & common_1.ChessTypeEnum.black); };
exports.checkedIsDead = function (isAIRound, chessboardMap) {
    var willFindRedCamp = common_1.Store.isPlayFirst ? !isAIRound : isAIRound;
    // debugger
    var index = chessboardMap.findIndex(function (row, top) {
        var res = row.findIndex(function (col, left) {
            if (exports.canChessMove(col, !willFindRedCamp)) {
                var moveResultArray = common_1.ChessMap[col].getAllMovePosition({ top: top, left: left, chessType: col, ChessBoardMap: chessboardMap });
                var res_1 = moveResultArray.findIndex(function (_a) {
                    var currentTop = _a[0], currentLeft = _a[1];
                    return (chessboardMap[currentTop][currentLeft] & common_1.ChessTypeEnum.j);
                });
                return res_1 !== -1;
            }
            return false;
        });
        return res !== -1;
    });
    return index !== -1;
};
exports.historyTable = new WeakMap();
// 获取历史表某一走法的值
function getBestMove(move) {
    if (exports.historyTable.has(move))
        return exports.historyTable.get(move);
    return 0;
}
exports.getBestMove = getBestMove;
// 更新历史表
function setBestMove(move, depth) {
    if (exports.historyTable.has(move)) {
        var value = exports.historyTable.get(move) + depth * depth;
        exports.historyTable.set(move, value);
    }
    else {
        exports.historyTable.set(move, depth * depth);
    }
}
exports.setBestMove = setBestMove;
