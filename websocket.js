var ws;

window.message = {
    clientID: -1,
    opponentID: -1,
    roomID: -1,
    key: ``,
    x: -1,
    y: -1,
    msg: ``,
    player: true,
    canStart: false,
    opponentQuit: false,
    talk: ``,
    canOpponentRegret: 0
};

window.newWebsocket = function () {
    ws = new WebSocket("wss://service-qgnrlvfs-1300852544.gz.apigw.tencentcs.com/release");
    ws.onopen = function (evt) {
        console.log("Connection open ...");
        ws.send(``);
    };

    ws.onmessage = function (evt) {
        console.log("Received Message: " + evt.data);
        var res = JSON.parse(evt.data)
        $(`#tips`).html(res.msg)
        if (res.canStart) {
            mode = 1
            if (res.opponentQuit == false) {
                if (res.canOpponentRegret != 0) { //对方发来悔棋请求或同意
                    if (res.canOpponentRegret == 1) {
                        if (confirm(`你同意对方悔棋吗？`)) {
                            message.canOpponentRegret = 2
                            message.key = ``
                            message.talk = ``
                            sendMessage()
                            regretObj.regret(!res.player)
                            var len = regretObj.data.length
                            if (len > 0) {
                                $(regretObj.data[len - 1][5]).css({
                                    "display": "block",
                                    "top": height * regretObj.data[len - 1][1] + `px`,
                                    "left": width * regretObj.data[len - 1][2] + `px`
                                })
                                $(regretObj.data[len - 1][6]).css({
                                    "display": "block",
                                    "top": height * regretObj.data[len - 1][3] + `px`,
                                    "left": width * regretObj.data[len - 1][4] + `px`
                                })
                            }
                        } else {
                            message.key = ``
                            message.talk = ``
                            message.canOpponentRegret = 3
                            sendMessage()
                        }
                    } else if (res.canOpponentRegret == 2) {
                        regretObj.regret(!res.player)
                        var len = regretObj.data.length
                        if (len > 0) {
                            $(regretObj.data[len - 1][5]).css({
                                "display": "block",
                                "top": height * regretObj.data[len - 1][1] + `px`,
                                "left": width * regretObj.data[len - 1][2] + `px`
                            })
                            $(regretObj.data[len - 1][6]).css({
                                "display": "block",
                                "top": height * regretObj.data[len - 1][3] + `px`,
                                "left": width * regretObj.data[len - 1][4] + `px`
                            })
                        }
                        $(`#tips`).html(`你撞大运了，对方同意悔棋！`)
                    } else if (res.canOpponentRegret == 3) {
                        $(`#tips`).html(`很遗憾，对方不同意悔棋！`)
                    }
                    res.canOpponentRegret = 0
                } else if (!!res.talk) {
                    var talkArea = $(`#talkArea`).val() + `对手：` + res.talk + `\n`
                    $(`#talkArea`).html(talkArea)
                    res.talk = ``
                } else if (!res.key) {
                    $(`#roomInput`).hide()
                    $(`.chess`).show()
                    $(`#startTalk`).show()
                    redchess(res.player)
                    blackchess(res.player)
                    chessCharacter = res.player
                    if (res.player == false) {
                        var chessBoards = []
                        for (var i = 0; i < chessBoard.length; i++) {
                            chessBoards.push(chessBoard[i].reverse());
                        }
                        chessBoard = chessBoards.reverse()
                    }
                }
                if (!!res.key) {
                    chooseID = res.key
                    chessMove(Math.abs(9 - res.x), Math.abs(8 - res.y), !res.player, 1)
                }
            }
        }
        message = res
    };

    ws.onclose = function (evt) {
        console.log("Connection closed.");
    };

    ws.error = function (e) {
        console.error(e)
    }

    // open:在成功建立连接时触发
    // error:在发生错误时触发
}

window.sendMessage = function () {
    var sendMsg = JSON.stringify(message);
    sendMsg = sendMsg.replace(/\"/g, `\\"`);
    ws.send(sendMsg); // 复杂的数据结构要先进行序列化
}


