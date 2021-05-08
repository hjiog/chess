"use strict";
exports.__esModule = true;
exports.RulesJ = exports.RulesS = exports.RulesX = exports.RulesC = exports.RulesP = exports.RulesM = exports.RulesB = void 0;
var types_1 = require("~/common/types");
var common_1 = require("~/common");
// 注意:左上角才是原点,因此,RiverTop指的是楚河汉界的下边界
var RiverTop = 5;
var RiverBottom = 4;
var ChessBoardTop = 9;
var ChessBoardBottom = 0;
var ChessBoardLeft = 0;
var ChessBoardRight = 8;
var checkCanMove = function (chessType1, chessType2) {
    return !(chessType1 & chessType2 & types_1.ChessTypeEnum.colorMask);
};
var checkIsBottomPlayer = function (chessType) {
    return common_1.Store.isPlayFirst ? chessType & types_1.ChessTypeEnum.red : chessType & types_1.ChessTypeEnum.black;
};
// 兵
exports.RulesB = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    // debugger
    var isPlayerBottom = checkIsBottomPlayer(chessType);
    var chessType2 = 0;
    if (isPlayerBottom && top > ChessBoardBottom) {
        // 底部方向上检索
        chessType2 = ChessBoardMap[top - 1][left];
        if (checkCanMove(chessType, chessType2))
            res.push([top - 1, left]);
    }
    else if (top < ChessBoardTop) {
        // 顶部方向下检索
        chessType2 = ChessBoardMap[top + 1][left];
        if (checkCanMove(chessType, chessType2))
            res.push([top + 1, left]);
    }
    // 兵过河左右查找
    if ((top < RiverTop && isPlayerBottom) || (top > RiverBottom && !isPlayerBottom)) {
        if (left > ChessBoardLeft) {
            chessType2 = ChessBoardMap[top][left - 1];
            if (checkCanMove(chessType, chessType2))
                res.push([top, left - 1]);
        }
        if (left < ChessBoardRight) {
            chessType2 = ChessBoardMap[top][left + 1];
            if (checkCanMove(chessType, chessType2))
                res.push([top, left + 1]);
        }
    }
    return res;
};
// 马
exports.RulesM = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    // 1点
    if (top - 2 >= ChessBoardBottom && left + 1 <= ChessBoardRight && !ChessBoardMap[top - 1][left] && checkCanMove(chessType, ChessBoardMap[top - 2][left + 1]))
        res.push([top - 2, left + 1]);
    // 2点
    if (top - 1 >= ChessBoardBottom && left + 2 <= ChessBoardRight && !ChessBoardMap[top][left + 1] && checkCanMove(chessType, ChessBoardMap[top - 1][left + 2]))
        res.push([top - 1, left + 2]);
    // 4点
    if (top + 1 <= ChessBoardTop && left + 2 <= ChessBoardRight && !ChessBoardMap[top][left + 1] && checkCanMove(chessType, ChessBoardMap[top + 1][left + 2]))
        res.push([top + 1, left + 2]);
    // 5点
    if (top + 2 <= ChessBoardTop && left + 1 <= ChessBoardRight && !ChessBoardMap[top + 1][left] && checkCanMove(chessType, ChessBoardMap[top + 2][left + 1]))
        res.push([top + 2, left + 1]);
    // 7点
    if (top + 2 <= ChessBoardTop && left - 1 >= ChessBoardLeft && !ChessBoardMap[top + 1][left] && checkCanMove(chessType, ChessBoardMap[top + 2][left - 1]))
        res.push([top + 2, left - 1]);
    // 8点
    if (top + 1 <= ChessBoardTop && left - 2 >= ChessBoardLeft && !ChessBoardMap[top][left - 1] && checkCanMove(chessType, ChessBoardMap[top + 1][left - 2]))
        res.push([top + 1, left - 2]);
    // 10点
    if (top - 1 >= ChessBoardBottom && left - 2 >= ChessBoardLeft && !ChessBoardMap[top][left - 1] && checkCanMove(chessType, ChessBoardMap[top - 1][left - 2]))
        res.push([top - 1, left - 2]);
    // 11点
    if (top - 2 >= ChessBoardBottom && left - 1 >= ChessBoardLeft && !ChessBoardMap[top - 1][left] && checkCanMove(chessType, ChessBoardMap[top - 2][left - 1]))
        res.push([top - 2, left - 1]);
    return res;
};
// 炮
exports.RulesP = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    // 上检索
    var n = 0;
    for (var i = top - 1; i >= ChessBoardBottom; i--) {
        if (ChessBoardMap[i][left]) {
            if (n === 0) {
                n++;
                continue;
            }
            else {
                if (checkCanMove(chessType, ChessBoardMap[i][left]))
                    res.push([i, left]);
                break;
            }
        }
        else {
            if (n === 0)
                res.push([i, left]);
        }
    }
    // 下检索
    n = 0;
    for (var i = top + 1; i <= ChessBoardTop; i++) {
        if (ChessBoardMap[i][left]) {
            if (n === 0) {
                n++;
                continue;
            }
            else {
                if (checkCanMove(chessType, ChessBoardMap[i][left]))
                    res.push([i, left]);
                break;
            }
        }
        else {
            if (n === 0)
                res.push([i, left]);
        }
    }
    // 左检索
    n = 0;
    for (var i = left - 1; i >= ChessBoardLeft; i--) {
        if (ChessBoardMap[top][i]) {
            if (n === 0) {
                n++;
                continue;
            }
            else {
                if (checkCanMove(chessType, ChessBoardMap[top][i]))
                    res.push([top, i]);
                break;
            }
        }
        else {
            if (n === 0)
                res.push([top, i]);
        }
    }
    // 右检索
    n = 0;
    for (var i = left + 1; i <= ChessBoardRight; i++) {
        if (ChessBoardMap[top][i]) {
            if (n === 0) {
                n++;
                continue;
            }
            else {
                if (checkCanMove(chessType, ChessBoardMap[top][i]))
                    res.push([top, i]);
                break;
            }
        }
        else {
            if (n === 0)
                res.push([top, i]);
        }
    }
    return res;
};
// 车
exports.RulesC = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    // 上检索
    for (var i = top - 1; i >= ChessBoardBottom; i--) {
        if (!ChessBoardMap[i][left]) {
            res.push([i, left]);
            continue;
        }
        else if (checkCanMove(chessType, ChessBoardMap[i][left])) {
            res.push([i, left]);
        }
        break;
    }
    // 下检索
    for (var i = top + 1; i <= ChessBoardTop; i++) {
        if (!ChessBoardMap[i][left]) {
            res.push([i, left]);
            continue;
        }
        else if (checkCanMove(chessType, ChessBoardMap[i][left])) {
            res.push([i, left]);
        }
        break;
    }
    // 左检索
    for (var i = left - 1; i >= ChessBoardLeft; i--) {
        if (!ChessBoardMap[top][i]) {
            res.push([top, i]);
            continue;
        }
        else if (checkCanMove(chessType, ChessBoardMap[top][i])) {
            res.push([top, i]);
        }
        break;
    }
    // 右检索
    for (var i = left + 1; i <= ChessBoardRight; i++) {
        if (!ChessBoardMap[top][i]) {
            res.push([top, i]);
            continue;
        }
        else if (checkCanMove(chessType, ChessBoardMap[top][i])) {
            res.push([top, i]);
        }
        break;
    }
    return res;
};
// 象
exports.RulesX = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    var chessType2 = 0;
    var isPlayerBottom = checkIsBottomPlayer(chessType);
    // 4点半
    if (top + 2 < 10 && left + 2 < ChessBoardTop && !ChessBoardMap[top + 1][left + 1]) {
        if (isPlayerBottom || (top + 2 <= 4 && !isPlayerBottom)) {
            chessType2 = ChessBoardMap[top + 2][left + 2];
            if (checkCanMove(chessType, chessType2))
                res.push([top + 2, left + 2]);
        }
    }
    // 7点半
    if (top + 2 < 10 && left - 2 >= ChessBoardLeft && !ChessBoardMap[top + 1][left - 1]) {
        if (isPlayerBottom || (top + 2 <= 4 && !isPlayerBottom)) {
            chessType2 = ChessBoardMap[top + 2][left - 2];
            if (checkCanMove(chessType, chessType2))
                res.push([top + 2, left - 2]);
        }
    }
    // 1点半
    if (top - 2 >= ChessBoardBottom && left + 2 < ChessBoardTop && !ChessBoardMap[top - 1][left + 1]) {
        if ((top - 2 >= 5 && isPlayerBottom) || !isPlayerBottom) {
            chessType2 = ChessBoardMap[top - 2][left + 2];
            if (checkCanMove(chessType, chessType2))
                res.push([top - 2, left + 2]);
        }
    }
    // 10点半
    if (top - 2 >= ChessBoardBottom && left - 2 >= ChessBoardLeft && !ChessBoardMap[top - 1][left - 1]) {
        if ((top - 2 >= 5 && isPlayerBottom) || !isPlayerBottom) {
            chessType2 = ChessBoardMap[top - 1][left - 1];
            if (checkCanMove(chessType, chessType2))
                res.push([top - 2, left - 2]);
        }
    }
    return res;
};
// 士
exports.RulesS = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    var chessType2 = 0;
    var isPlayerBottom = checkIsBottomPlayer(chessType);
    // 4点半
    if ((left + 1 <= 5 && top < ChessBoardTop && isPlayerBottom) || (top + 1 <= 2 && left + 1 <= 5 && !isPlayerBottom)) {
        chessType2 = ChessBoardMap[top + 1][left + 1];
        if (checkCanMove(chessType, chessType2))
            res.push([top + 1, left + 1]);
    }
    // 7点半
    if ((left - 1 >= 3 && top < ChessBoardTop && isPlayerBottom) || (top + 1 <= 2 && left - 1 >= 3 && !isPlayerBottom)) {
        chessType2 = ChessBoardMap[top + 1][left - 1];
        if (checkCanMove(chessType, chessType2))
            res.push([top + 1, left - 1]);
    }
    // 1点半
    if ((top - 1 >= 7 && left + 1 <= 5 && isPlayerBottom) || (left + 1 <= 5 && top > ChessBoardBottom && !isPlayerBottom)) {
        chessType2 = ChessBoardMap[top - 1][left + 1];
        if (checkCanMove(chessType, chessType2))
            res.push([top - 1, left + 1]);
    }
    // 10点半
    if ((top - 1 >= 7 && left - 1 >= 3 && isPlayerBottom) || (left - 1 >= 3 && top > ChessBoardBottom && !isPlayerBottom)) {
        chessType2 = ChessBoardMap[top - 1][left - 1];
        if (checkCanMove(chessType, chessType2))
            res.push([top - 1, left - 1]);
    }
    return res;
};
// 将
exports.RulesJ = function (props) {
    var top = props.top, left = props.left, chessType = props.chessType, ChessBoardMap = props.ChessBoardMap;
    var res = [];
    var chessType2 = 0;
    var isPlayerBottom = checkIsBottomPlayer(chessType);
    // 下
    if ((top + 1 <= ChessBoardTop && isPlayerBottom) || (top + 1 <= 2 && !isPlayerBottom)) {
        chessType2 = ChessBoardMap[top + 1][left];
        if (checkCanMove(chessType, chessType2))
            res.push([top + 1, left]);
    }
    // 上
    if ((top - 1 >= 7 && isPlayerBottom) || (top - 1 >= ChessBoardBottom && !isPlayerBottom)) {
        chessType2 = ChessBoardMap[top - 1][left];
        if (checkCanMove(chessType, chessType2))
            res.push([top - 1, left]);
    }
    // 老将对老将的情况
    if (isPlayerBottom) {
        for (var i = top - 1; i >= ChessBoardBottom; i--) {
            chessType2 = ChessBoardMap[i][left];
            if (chessType2 === 0) {
                continue;
            }
            else if (chessType2 & types_1.ChessTypeEnum.j) {
                res.push([i, left]);
                break;
            }
            else {
                break;
            }
        }
    }
    else {
        for (var i = top + 1; i <= ChessBoardTop; i++) {
            chessType2 = ChessBoardMap[i][left];
            if (chessType2 === 0) {
                continue;
            }
            else if (chessType2 & types_1.ChessTypeEnum.j) {
                res.push([i, left]);
                break;
            }
            else {
                break;
            }
        }
    }
    // 右
    if (left + 1 <= 5) {
        chessType2 = ChessBoardMap[top][left + 1];
        if (checkCanMove(chessType, chessType2))
            res.push([top, left + 1]);
    }
    // 左
    if (left - 1 >= 3) {
        chessType2 = ChessBoardMap[top][left - 1];
        if (checkCanMove(chessType, chessType2))
            res.push([top, left - 1]);
    }
    return res;
};
