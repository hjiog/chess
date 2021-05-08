"use strict";
var _a;
exports.__esModule = true;
exports.Store = exports.ChessMoveCallback = exports.ChessActivingState = exports.ChessBoxStateMap = void 0;
var vue_1 = require("vue");
var types_1 = require("~/common/types");
exports.ChessBoxStateMap = (_a = {},
    _a[types_1.ChessBoxStateEnum.red | types_1.ChessBoxStateEnum.currentState] = vue_1.reactive({
        top: -1,
        left: -1
    }),
    _a[types_1.ChessBoxStateEnum.red | types_1.ChessBoxStateEnum.previousState] = vue_1.reactive({
        top: -1,
        left: -1
    }),
    _a[types_1.ChessBoxStateEnum.black | types_1.ChessBoxStateEnum.currentState] = vue_1.reactive({
        top: -1,
        left: -1
    }),
    _a[types_1.ChessBoxStateEnum.black | types_1.ChessBoxStateEnum.previousState] = vue_1.reactive({
        top: -1,
        left: -1
    }),
    _a);
exports.ChessActivingState = vue_1.ref(types_1.ChessTypeEnum.red);
// todo 加上call属性是因为不能直接修改ChessMoveCallback
exports.ChessMoveCallback = {
    call: function () { return false; }
};
exports.Store = {
    isPlayFirst: true,
    canStart: vue_1.ref(types_1.PlayMode.waitingStart)
};
