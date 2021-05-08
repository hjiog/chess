"use strict";
exports.__esModule = true;
exports.MoveSort = void 0;
var utils_1 = require("./utils");
var common_1 = require("~/common");
// 希尔排序
var SHELL_STEP = [0, 1, 4, 13, 40, 121, 364, 1093];
var MoveSort = /** @class */ (function () {
    function MoveSort(isAIRound, chessboardMap) {
        this.mvs = []; // 走法数组，存储当前局面所有走法
        this.vls = []; // 在历史表中，每个走法对应的分值
        this.index = 0;
        var willFindRedCamp = common_1.Store.isPlayFirst ? !isAIRound : isAIRound;
        // debugger
        // 生成全部走法
        var mvsAll = getMoves(willFindRedCamp, chessboardMap);
        for (var i = 0; i < mvsAll.length; i++) {
            var move = mvsAll[i];
            this.mvs.push(move);
            this.vls.push(utils_1.getBestMove(move)); // 获取历史表中，该走法的值
        }
        shellSort(this.mvs, this.vls); // 根据历史表的分值，对走法进行排序
    }
    // 获得一步排序后的走法。如果走法已经全部获取，则返回0
    MoveSort.prototype.next = function () {
        if (this.index < this.mvs.length) {
            var mv = this.mvs[this.index];
            this.index++;
            // debugger
            return mv;
        }
    };
    return MoveSort;
}());
exports.MoveSort = MoveSort;
function getMoves(willFindRedCamp, chessboardMap) {
    var moves = [];
    chessboardMap.forEach(function (row, top) {
        row.forEach(function (col, left) {
            if (utils_1.canChessMove(col, willFindRedCamp)) {
                var moveResultArray = common_1.ChessMap[col].getAllMovePosition({ top: top, left: left, chessType: col, ChessBoardMap: chessboardMap });
                // todo 考虑长将走法?
                moves = moves.concat(moveResultArray.map(function (val) {
                    return {
                        originPostion: {
                            top: top,
                            left: left
                        },
                        currentPostion: {
                            top: val[0],
                            left: val[1]
                        }
                    };
                }));
            }
        });
    });
    return moves;
}
function shellSort(mvs, vls) {
    var stepLevel = 1;
    while (SHELL_STEP[stepLevel] < mvs.length)
        stepLevel++;
    stepLevel--;
    while (stepLevel > 0) {
        var step = SHELL_STEP[stepLevel];
        for (var i = step; i < mvs.length; i++) {
            var mvBest = mvs[i];
            var vlBest = vls[i];
            var j = i - step;
            while (j >= 0 && vlBest > vls[j]) {
                mvs[j + step] = mvs[j];
                vls[j + step] = vls[j];
                j -= step;
            }
            mvs[j + step] = mvBest;
            vls[j + step] = vlBest;
        }
        stepLevel--;
    }
}
