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
exports.sendMessage = exports.connectWebsocket = void 0;
var url = 'wss://service-qgnrlvfs-1300852544.gz.apigw.tencentcs.com/release';
// const url = 'ws://localhost:8085/getData'
var ws;
var _message = {};
exports.connectWebsocket = function (cb) {
    if (ws)
        return;
    ws = new WebSocket(url);
    ws.onopen = function () {
        console.log('Connection open ...');
        ws.send('');
    };
    ws.onmessage = function (e) {
        try {
            var res = JSON.parse(e.data);
            console.log('Received RecieverType: ', res);
            _message = __assign(__assign({}, res), { currentLeft: -1, currentTop: -1, preLeft: -1, preTop: -1, canOpponentRegret: 0, canRestart: 0, msg: '', talk: '' });
            cb === null || cb === void 0 ? void 0 : cb(res);
        }
        catch (e) {
            console.log(e);
        }
    };
    ws.onclose = function () {
        console.log('Connection closed.');
    };
    ws.onerror = function (e) {
        console.error(e);
    };
};
exports.sendMessage = function (message) {
    var sendMsg = JSON.stringify(__assign(__assign({}, _message), message));
    // sendMsg = sendMsg.replace(/\"/g, '\\"')
    ws.send(sendMsg); // 复杂的数据结构要先进行序列化
};
