"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b;
exports.__esModule = true;
exports.ChessBoardMap = exports.initChessBoardMap = exports.ColorBoxUrlMap = exports.ChessMap = exports.initChessMap = void 0;
var chessRules_1 = require("./chessRules");
var imgImport_1 = require("./imgImport");
var types_1 = require("~/common/types");
// 定义棋子价值
var chessValueB = [
    [9, 9, 9, 11, 13, 11, 9, 9, 9],
    [19, 24, 34, 42, 44, 42, 34, 24, 19],
    [19, 24, 32, 37, 37, 37, 32, 24, 19],
    [19, 23, 27, 29, 30, 29, 27, 23, 19],
    [14, 18, 20, 27, 29, 27, 20, 18, 14],
    [7, 0, 13, 0, 16, 0, 13, 0, 7],
    [7, 0, 7, 0, 15, 0, 7, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var chessValueC = [
    [206, 208, 207, 213, 214, 213, 207, 208, 206],
    [206, 212, 209, 216, 233, 216, 209, 212, 206],
    [206, 208, 207, 214, 216, 214, 207, 208, 206],
    [206, 213, 213, 216, 216, 216, 213, 213, 206],
    [208, 211, 211, 214, 215, 214, 211, 211, 208],
    [208, 212, 212, 214, 215, 214, 212, 212, 208],
    [204, 209, 204, 212, 214, 212, 204, 209, 204],
    [198, 208, 204, 212, 212, 212, 204, 208, 198],
    [200, 208, 206, 212, 200, 212, 206, 208, 200],
    [194, 206, 204, 212, 200, 212, 204, 206, 194],
];
var chessValueM = [
    [90, 90, 90, 96, 90, 96, 90, 90, 90],
    [90, 96, 103, 97, 94, 97, 103, 96, 90],
    [92, 98, 99, 103, 99, 103, 99, 98, 92],
    [93, 108, 100, 107, 100, 107, 100, 108, 93],
    [90, 100, 99, 103, 104, 103, 99, 100, 90],
    [90, 98, 101, 102, 103, 102, 101, 98, 90],
    [92, 94, 98, 95, 98, 95, 98, 94, 92],
    [93, 92, 94, 95, 92, 95, 94, 92, 93],
    [85, 90, 92, 93, 78, 93, 92, 90, 85],
    [88, 85, 90, 88, 90, 88, 90, 85, 88],
];
var chessValueP = [
    [100, 100, 96, 91, 90, 91, 96, 100, 100],
    [98, 98, 96, 92, 89, 92, 96, 98, 98],
    [97, 97, 96, 91, 92, 91, 96, 97, 97],
    [96, 99, 99, 98, 100, 98, 99, 99, 96],
    [96, 96, 96, 96, 100, 96, 96, 96, 96],
    [95, 96, 99, 96, 100, 96, 99, 96, 95],
    [96, 96, 96, 96, 96, 96, 96, 96, 96],
    [97, 96, 100, 99, 101, 99, 100, 96, 97],
    [96, 97, 98, 98, 98, 98, 98, 97, 96],
    [96, 96, 97, 99, 99, 99, 97, 96, 96],
];
var chessValueS = [
    [0, 0, 0, 20, 0, 20, 0, 0, 0],
    [0, 0, 0, 0, 23, 0, 0, 0, 0],
    [0, 0, 0, 20, 0, 20, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 20, 0, 20, 0, 0, 0],
    [0, 0, 0, 0, 23, 0, 0, 0, 0],
    [0, 0, 0, 20, 0, 20, 0, 0, 0],
];
var chessValueX = [
    [0, 0, 20, 0, 0, 0, 20, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 23, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 20, 0, 0, 0, 20, 0, 0],
    [0, 0, 20, 0, 0, 0, 20, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [18, 0, 0, 0, 23, 0, 0, 0, 18],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 20, 0, 0, 0, 20, 0, 0],
];
var chessValueJ = [
    [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
    [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
    [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
    [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
    [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
];
var _ChessMap = (_a = {},
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.b] = {
        url: imgImport_1.imgUrl_b,
        position: [{ top: 6, left: 0 }, { top: 6, left: 2 }, { top: 6, left: 4 }, { top: 6, left: 6 }, { top: 6, left: 8 }],
        getAllMovePosition: chessRules_1.RulesB,
        valueMap: chessValueB
    },
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.c] = {
        url: imgImport_1.imgUrl_c,
        position: [{ top: 9, left: 0 }, { top: 9, left: 8 }],
        getAllMovePosition: chessRules_1.RulesC,
        valueMap: chessValueC
    },
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.m] = {
        url: imgImport_1.imgUrl_m,
        position: [{ top: 9, left: 1 }, { top: 9, left: 7 }],
        getAllMovePosition: chessRules_1.RulesM,
        valueMap: chessValueM
    },
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.p] = {
        url: imgImport_1.imgUrl_p,
        position: [{ top: 7, left: 1 }, { top: 7, left: 7 }],
        getAllMovePosition: chessRules_1.RulesP,
        valueMap: chessValueP
    },
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.s] = {
        url: imgImport_1.imgUrl_s,
        position: [{ top: 9, left: 3 }, { top: 9, left: 5 }],
        getAllMovePosition: chessRules_1.RulesS,
        valueMap: chessValueS
    },
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.x] = {
        url: imgImport_1.imgUrl_x,
        position: [{ top: 9, left: 2 }, { top: 9, left: 6 }],
        getAllMovePosition: chessRules_1.RulesX,
        valueMap: chessValueX
    },
    _a[types_1.ChessTypeEnum.red | types_1.ChessTypeEnum.j] = {
        url: imgImport_1.imgUrl_j,
        position: [{ top: 9, left: 4 }],
        getAllMovePosition: chessRules_1.RulesJ,
        valueMap: chessValueJ
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.b] = {
        url: imgImport_1.imgUrl_B,
        position: [{ top: 3, left: 0 }, { top: 3, left: 2 }, { top: 3, left: 4 }, { top: 3, left: 6 }, { top: 3, left: 8 }],
        getAllMovePosition: chessRules_1.RulesB,
        valueMap: __spreadArrays(chessValueB).reverse()
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.c] = {
        url: imgImport_1.imgUrl_C,
        position: [{ top: 0, left: 0 }, { top: 0, left: 8 }],
        getAllMovePosition: chessRules_1.RulesC,
        valueMap: __spreadArrays(chessValueC).reverse()
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.m] = {
        url: imgImport_1.imgUrl_M,
        position: [{ top: 0, left: 1 }, { top: 0, left: 7 }],
        getAllMovePosition: chessRules_1.RulesM,
        valueMap: __spreadArrays(chessValueM).reverse()
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.p] = {
        url: imgImport_1.imgUrl_P,
        position: [{ top: 2, left: 1 }, { top: 2, left: 7 }],
        getAllMovePosition: chessRules_1.RulesP,
        valueMap: __spreadArrays(chessValueP).reverse()
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.s] = {
        url: imgImport_1.imgUrl_S,
        position: [{ top: 0, left: 3 }, { top: 0, left: 5 }],
        getAllMovePosition: chessRules_1.RulesS,
        valueMap: __spreadArrays(chessValueS).reverse()
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.x] = {
        url: imgImport_1.imgUrl_X,
        position: [{ top: 0, left: 2 }, { top: 0, left: 6 }],
        getAllMovePosition: chessRules_1.RulesX,
        valueMap: __spreadArrays(chessValueX).reverse()
    },
    _a[types_1.ChessTypeEnum.black | types_1.ChessTypeEnum.j] = {
        url: imgImport_1.imgUrl_J,
        position: [{ top: 0, left: 4 }],
        getAllMovePosition: chessRules_1.RulesJ,
        valueMap: __spreadArrays(chessValueJ).reverse()
    },
    _a);
exports.initChessMap = function () {
    var realChessMap = {};
    Object.keys(_ChessMap).forEach(function (key) {
        var realKey = Number(key);
        realChessMap[realKey] = __assign(__assign({}, _ChessMap[realKey]), { position: __spreadArrays(_ChessMap[realKey].position) });
    });
    return realChessMap;
};
exports.ChessMap = exports.initChessMap();
exports.ColorBoxUrlMap = (_b = {},
    _b[types_1.ChessBoxStateEnum.red] = imgImport_1.imgUrl_redBox,
    _b[types_1.ChessBoxStateEnum.black] = imgImport_1.imgUrl_blueBox,
    _b);
// 建立10*9的矩阵，存储棋盘棋子的位置
var getChessBoardMap = function (isNumber) {
    var _chessBoardMap = new Array(10);
    for (var i = 0; i < _chessBoardMap.length; i++) {
        _chessBoardMap[i] = new Array(9);
        for (var j = 0; j < _chessBoardMap[i].length; j++)
            _chessBoardMap[i][j] = isNumber ? 0 : [];
    }
    return _chessBoardMap;
};
var initChessTypeMap = function (chessTypeMap) {
    Object.keys(exports.ChessMap).forEach(function (key) {
        var position = exports.ChessMap[key].position;
        position.forEach(function (pos) {
            chessTypeMap[pos.top][pos.left] = Number(key);
        });
    });
    return chessTypeMap;
};
exports.initChessBoardMap = function () {
    return {
        chessTypeMap: initChessTypeMap(getChessBoardMap(true)),
        chessRefMap: getChessBoardMap(false)
    };
};
exports.ChessBoardMap = exports.initChessBoardMap();
