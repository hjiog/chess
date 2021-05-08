"use strict";
exports.__esModule = true;
exports.MsgType = exports.PlayMode = exports.RestartType = exports.RegretType = exports.ChessBoxStateEnum = exports.ChessTypeEnum = void 0;
var ChessTypeEnum;
(function (ChessTypeEnum) {
    ChessTypeEnum[ChessTypeEnum["red"] = 1] = "red";
    ChessTypeEnum[ChessTypeEnum["black"] = 2] = "black";
    ChessTypeEnum[ChessTypeEnum["colorMask"] = 3] = "colorMask";
    ChessTypeEnum[ChessTypeEnum["b"] = 4] = "b";
    ChessTypeEnum[ChessTypeEnum["c"] = 8] = "c";
    ChessTypeEnum[ChessTypeEnum["m"] = 16] = "m";
    ChessTypeEnum[ChessTypeEnum["p"] = 32] = "p";
    ChessTypeEnum[ChessTypeEnum["x"] = 64] = "x";
    ChessTypeEnum[ChessTypeEnum["s"] = 128] = "s";
    ChessTypeEnum[ChessTypeEnum["j"] = 256] = "j";
    ChessTypeEnum[ChessTypeEnum["selected"] = 512] = "selected";
})(ChessTypeEnum = exports.ChessTypeEnum || (exports.ChessTypeEnum = {}));
var ChessBoxStateEnum;
(function (ChessBoxStateEnum) {
    ChessBoxStateEnum[ChessBoxStateEnum["red"] = 1] = "red";
    ChessBoxStateEnum[ChessBoxStateEnum["black"] = 2] = "black";
    ChessBoxStateEnum[ChessBoxStateEnum["colorMask"] = 3] = "colorMask";
    ChessBoxStateEnum[ChessBoxStateEnum["currentState"] = 4] = "currentState";
    ChessBoxStateEnum[ChessBoxStateEnum["previousState"] = 8] = "previousState";
})(ChessBoxStateEnum = exports.ChessBoxStateEnum || (exports.ChessBoxStateEnum = {}));
var RegretType;
(function (RegretType) {
    RegretType[RegretType["init"] = 0] = "init";
    RegretType[RegretType["request"] = 1] = "request";
    RegretType[RegretType["agree"] = 2] = "agree";
    RegretType[RegretType["disagree"] = 3] = "disagree";
})(RegretType = exports.RegretType || (exports.RegretType = {}));
var RestartType;
(function (RestartType) {
    RestartType[RestartType["init"] = 0] = "init";
    RestartType[RestartType["request"] = 1] = "request";
    RestartType[RestartType["agree"] = 2] = "agree";
    RestartType[RestartType["disagree"] = 3] = "disagree";
})(RestartType = exports.RestartType || (exports.RestartType = {}));
var PlayMode;
(function (PlayMode) {
    PlayMode[PlayMode["waitingStart"] = 0] = "waitingStart";
    PlayMode[PlayMode["playWithComputer"] = 1] = "playWithComputer";
    PlayMode[PlayMode["playOnline"] = 2] = "playOnline";
})(PlayMode = exports.PlayMode || (exports.PlayMode = {}));
var MsgType;
(function (MsgType) {
    MsgType[MsgType["system"] = 0] = "system";
    MsgType[MsgType["yours"] = 1] = "yours";
    MsgType[MsgType["opponent"] = 2] = "opponent";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
