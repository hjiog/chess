window.aiStart = function () {
    console.log(`start1`)
    $(`#roomInput`).hide()
    $(`.chess`).show()
    redchess(true)
    blackchess(true)
    for (var i = 0; i < 2880; i++) { //10*9*32=2880
        historyTable.push(0)
    }
    message.player = true
    mode = 0
}

window.onlineStart = function () {
    console.log(`start2`)
    $(`#roomInput`).show()
    newWebsocket();
}

window.confirms = function () {
    message.roomID = Number($(`#roomID`).val())
    console.log(message.roomID, typeof (message.roomID))
    sendMessage()
    mode = 1
}

window.send = function () {
    var talk = $(`#talkInput`).val()
    console.log(talk)
    message.talk = talk
    message.key = ``
    sendMessage()
    var talkArea = $(`#talkArea`).val() + `我：` + talk + `\n`
    $(`#talkArea`).html(talkArea)
}

window.regretObj = {
    // regretID: ``,
    // regretX: [],
    // regretY: [],
    // nowX: [],
    // nowY: [],
    // killID: "",
    // boxID1: "",
    // boxID2: "",
    // anotherBoxID1: "",
    // anotherBoxID2: "",
    // hasRegret: false,
    data: [],
    setData: function (regretIDs, regretXs, regretYs, nowXs, nowYs, boxID1s, boxID2s, anotherBoxID1s,
        anotherBoxID2s, killIDs = '') {
        // regretObj.regretID = regretIDs
        // regretObj.regretX = regretObj.regretX.push(regretXs)
        // regretObj.regretY = regretObj.regretY.push(regretYs)
        // regretObj.nowX = regretObj.nowX.push(nowXs)
        // regretObj.nowY = regretObj.nowY.push(nowYs)
        // regretObj.boxID1 = boxID1s
        // regretObj.boxID2 = boxID2s
        // regretObj.anotherBoxID1 = anotherBoxID1s
        // regretObj.anotherBoxID2 = anotherBoxID2s
        // regretObj.killID = killIDs
        // regretObj.hasRegret = false
        regretObj.data.push([regretIDs, regretXs, regretYs, nowXs, nowYs, boxID1s, boxID2s, anotherBoxID1s,
            anotherBoxID2s, killIDs
        ])
    },
    regret: function (isReverse) {
        console.log(`************************************regretObj`, regretObj)

        // if (regretObj.hasRegret == true) {
        //     return
        // }

        var regretData = regretObj.data.pop()

        regretObj.hasRegret = true
        chessCharacter = !chessCharacter

        $(regretData[0]).css({
            "top": height * regretData[1] + `px`,
            "left": width * regretData[2] + `px`
        })
        $(regretData[6]).css({
            "display": "none",
        })
        $(regretData[5]).css({
            "display": "none"
        })

        $(regretData[7]).css({
            "display": "none",
        })
        $(regretData[8]).css({
            "display": "none",
        })

        $(`#b_box3`).css({
            "display": "none",
        })

        $(`#r_box3`).css({
            "display": "none",
        })
        chessBoard[regretData[1]][regretData[2]] = regretData[0]
        chessBoard[regretData[3]][regretData[4]] = regretData[9]
        if (isReverse) {
            setChessPosition(regretData[0], Math.abs(9 - regretData[1]), Math.abs(8 - regretData[2]))
        } else {
            setChessPosition(regretData[0], regretData[1], regretData[2])
        }
        if (!!regretData[9]) {
            $(regretData[9]).show()
        }
    },
}