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
exports.__esModule = true;
exports.chessMove = exports.restoreHistory = exports.recordHistory = exports.getHistoryLength = exports.initStatus = exports.getChessBoxState = void 0;
var vue_1 = require("vue");
var common_1 = require("~/common");
exports.getChessBoxState = vue_1.computed(function () {
    var activingColorState = common_1.ChessActivingState.value & common_1.ChessBoxStateEnum.colorMask;
    var activedColorState = activingColorState ^ common_1.ChessBoxStateEnum.colorMask;
    var currentChessState = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.currentState | activingColorState];
    var previousChessState = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.previousState | activingColorState];
    var res = {
        currentChessState: currentChessState,
        previousChessState: previousChessState,
        activedColorState: activedColorState,
        activingColorState: activingColorState
    };
    return res;
});
exports.initStatus = function (isPlayFirst) {
    var realChessMap = common_1.initChessMap();
    var realChessBoardMap = common_1.initChessBoardMap();
    common_1.ChessBoardMap.chessRefMap = realChessBoardMap.chessRefMap;
    common_1.ChessBoardMap.chessTypeMap = realChessBoardMap.chessTypeMap;
    var preRedBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.red | common_1.ChessBoxStateEnum.previousState];
    var currentRedBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.red | common_1.ChessBoxStateEnum.currentState];
    var preBlackBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.black | common_1.ChessBoxStateEnum.previousState];
    var currentBlackBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.black | common_1.ChessBoxStateEnum.currentState];
    var initVal = -1;
    preRedBox.top = initVal;
    preRedBox.left = initVal;
    currentRedBox.top = initVal;
    currentRedBox.left = initVal;
    preBlackBox.top = initVal;
    preBlackBox.left = initVal;
    currentBlackBox.top = initVal;
    currentBlackBox.left = initVal;
    common_1.Store.isPlayFirst = isPlayFirst;
    common_1.ChessActivingState.value = common_1.ChessTypeEnum.red;
    if (!isPlayFirst) {
        // exchange position and valuemap
        var chessKeys = Object.keys(realChessMap);
        var chessTypeSet = new Set();
        // debugger
        for (var i = 0; i < chessKeys.length; i++) {
            var chessKey = Number(chessKeys[i]);
            var colorType = chessKey & common_1.ChessTypeEnum.colorMask;
            var anotherColorType = colorType ^ common_1.ChessTypeEnum.colorMask;
            var chessType = chessKey - colorType;
            var anotherChessKey = chessType + anotherColorType;
            // debugger
            if (chessTypeSet.has(chessType))
                continue;
            chessTypeSet.add(chessType);
            var chessVal1 = realChessMap[chessKey];
            var chessVal2 = realChessMap[anotherChessKey];
            // console.log(chessKey, chessVal1, anotherChessKey, chessVal2, realChessMap)
            var temp = __assign({}, chessVal1);
            chessVal1.position = chessVal2.position;
            chessVal1.valueMap = chessVal2.valueMap;
            chessVal2.position = temp.position;
            chessVal2.valueMap = temp.valueMap;
        }
        common_1.ChessBoardMap.chessTypeMap.reverse();
    }
    return realChessMap;
};
var historyHeap = vue_1.reactive([]);
exports.getHistoryLength = function () { return historyHeap.length; };
exports.recordHistory = function (origin, destination) {
    historyHeap.push([origin, destination]);
};
exports.restoreHistory = function () {
    var move = historyHeap.pop();
    if (move) {
        var preKey = move[0].key;
        var prePos = move[0].pos;
        var currentKey = move[1].key;
        var currentPos = move[1].pos;
        var chessTypeMap = common_1.ChessBoardMap.chessTypeMap, chessRefMap = common_1.ChessBoardMap.chessRefMap;
        chessTypeMap[prePos.top][prePos.left] = preKey;
        chessTypeMap[currentPos.top][currentPos.left] = currentKey;
        var preChessRef = chessRefMap[prePos.top][prePos.left];
        var currentChessRef = chessRefMap[currentPos.top][currentPos.left];
        var chessRestoreRef = currentChessRef.pop();
        preChessRef.push(chessRestoreRef);
        // chess move
        chessRestoreRef.top = prePos.top;
        chessRestoreRef.left = prePos.left;
        // show the died chess
        if (currentKey)
            currentChessRef[currentChessRef.length - 1].isDied = false;
        // change ChessActivingState
        common_1.ChessActivingState.value = preKey & common_1.ChessTypeEnum.colorMask;
        // chessBox move
        var chessBoxMove = historyHeap[historyHeap.length - 1];
        if (historyHeap.length) {
            var preKey_1 = chessBoxMove[0].key;
            var prePos_1 = chessBoxMove[0].pos;
            var currentPos_1 = chessBoxMove[1].pos;
            var chessBoxColor = preKey_1 & common_1.ChessTypeEnum.colorMask;
            var preChessBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.previousState | chessBoxColor];
            var currentChessBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.currentState | chessBoxColor];
            preChessBox.top = prePos_1.top;
            preChessBox.left = prePos_1.left;
            currentChessBox.top = currentPos_1.top;
            currentChessBox.left = currentPos_1.left;
        }
        else {
            // let another chessbox disappear
            var colorState = common_1.ChessActivingState.value & common_1.ChessTypeEnum.colorMask ^ common_1.ChessTypeEnum.colorMask;
            var preChessBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.previousState | colorState];
            var currentChessBox = common_1.ChessBoxStateMap[common_1.ChessBoxStateEnum.currentState | colorState];
            var initVal = -1;
            preChessBox.top = initVal;
            preChessBox.left = initVal;
            currentChessBox.top = initVal;
            currentChessBox.left = initVal;
        }
    }
    // console.log(historyHeap, '====')
};
exports.chessMove = function (originPostion, currentPostion) {
    var chessRefMap = common_1.ChessBoardMap.chessRefMap, chessTypeMap = common_1.ChessBoardMap.chessTypeMap;
    // change chess type
    var preChessType = chessTypeMap[originPostion.top][originPostion.left];
    var currentChessType = chessTypeMap[currentPostion.top][currentPostion.left];
    chessTypeMap[currentPostion.top][currentPostion.left] = preChessType;
    chessTypeMap[originPostion.top][originPostion.left] = 0;
    // exchange chess ref
    var preChessRef = chessRefMap[originPostion.top][originPostion.left];
    var currentChessRef = chessRefMap[currentPostion.top][currentPostion.left];
    var chessTOKilledRef = currentChessRef[currentChessRef.length - 1];
    var activingChess = preChessRef.pop();
    currentChessRef.push(activingChess);
    // debugger
    activingChess.top = currentPostion.top;
    activingChess.left = currentPostion.left;
    if (currentChessType)
        chessTOKilledRef.isDied = true;
    // recordHistory
    exports.recordHistory({ key: preChessType, pos: originPostion }, { key: currentChessType, pos: currentPostion });
    // change chess box
    // debugger
    var activingChessBoxColor = preChessType & common_1.ChessBoxStateEnum.colorMask;
    var preChessBox = common_1.ChessBoxStateMap[activingChessBoxColor | common_1.ChessBoxStateEnum.previousState];
    var currentChessBox = common_1.ChessBoxStateMap[activingChessBoxColor | common_1.ChessBoxStateEnum.currentState];
    preChessBox.top = originPostion.top;
    preChessBox.left = originPostion.left;
    currentChessBox.top = currentPostion.top;
    currentChessBox.left = currentPostion.left;
    common_1.ChessActivingState.value = activingChessBoxColor ^ common_1.ChessBoxStateEnum.colorMask;
    return currentChessType & common_1.ChessTypeEnum.j;
};
