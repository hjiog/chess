"use strict";
exports.__esModule = true;
var computeTask_1 = require("./computeTask");
var common_1 = require("~/common");
var const_1 = require("~/webWorker/const");
var ctx = self;
ctx.addEventListener('message', function (e) {
    console.log('ai start,recieve data:', e.data);
    // 注意,在webWork引入的Store是一份拷贝,在主程序执行Store.isPlayFirst = true
    // 并不会影响到这里的Store,因此这里还需操作一次
    common_1.Store.isPlayFirst = e.data.isPlayFirst;
    var searchResult = {
        originPostion: {
            top: 0,
            left: 0
        },
        currentPostion: {
            top: 0,
            left: 0
        }
    };
    var value = computeTask_1.alphaBetaSearch({
        valAlpha: -const_1.MATE_VALUE,
        valBeta: const_1.MATE_VALUE,
        depth: const_1.MINMAXDEPTH,
        chessboardMap: e.data.ChessBoardMap,
        searchResult: searchResult
    });
    console.log(searchResult, 'value:', value);
    ctx.postMessage(searchResult);
});
