"use strict";
exports.__esModule = true;
exports.worker = void 0;
/* eslint-disable no-console */
// 在生产构建中将会分离出 chunk
var ant_design_vue_1 = require("ant-design-vue");
var index_worker_1 = require("./index?worker");
var common_1 = require("~/common");
var worker = new index_worker_1["default"]();
exports.worker = worker;
worker.onmessage = function (e) {
    var result = e.data;
    console.log('AI search result============', result);
    var _a = result, originPostion = _a.originPostion, currentPostion = _a.currentPostion;
    if (originPostion.top === -1) {
        ant_design_vue_1.message.success('绝杀!!! 恭喜你赢得本次对局');
        return;
    }
    var isLosed = common_1.chessMove(originPostion, currentPostion);
    if (isLosed)
        ant_design_vue_1.message.info('你输了>=<');
};
worker.onerror = function (e) {
    console.error('webWorker error', e);
};
