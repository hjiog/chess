"use strict";
exports.__esModule = true;
exports.worker = void 0;
// 在生产构建中将会分离出 chunk
var ant_design_vue_1 = require("ant-design-vue");
var index_worker_1 = require("./index?worker");
var common_1 = require("~/common");
exports.worker = new index_worker_1["default"]();
exports.worker.onmessage = function (e) {
    var result = e.data;
    console.log('AI search result============', result);
    var _a = result, originPostion = _a.originPostion, currentPostion = _a.currentPostion;
    if (originPostion.top === currentPostion.top && originPostion.left === currentPostion.left) {
        ant_design_vue_1.message.success({
            message: '绝杀!!! 恭喜你赢得本次对局'
        });
        return;
    }
    var isLosed = common_1.chessMove(originPostion, currentPostion);
    if (isLosed) {
        ant_design_vue_1.message.info({
            message: '你输了>=<'
        });
    }
};
exports.worker.addEventListener('error', console.error);
