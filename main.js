window.height = 67
window.width = 66
window.chooseID = ``
var preID = ``
var index = 0
var preIndex = 0
var preIndex = 0
var isOverChess = false
window.chessClickStatus = 0
window.chessCharacter = true
var offsetLeft = -1
var offsetTop = -1
var allMovePosition = ``
var canKill = false
window.killID = ``
window.mode = 0
window.boxID1 = "";
window.boxID2 = "";
window.boxID3 = "";
window.anotherBoxID1 = "";
window.anotherBoxID2 = "";
window.anotherBoxID3 = "";


window.chessPosition = {
    b: [{
        x: 6,
        y: 0
    }, {
        x: 6,
        y: 2
    }, {
        x: 6,
        y: 4
    }, {
        x: 6,
        y: 6
    }, {
        x: 6,
        y: 8
    }],
    p: [{
        x: 7,
        y: 1
    }, {
        x: 7,
        y: 7
    }],
    x: [{
        x: 9,
        y: 2
    }, {
        x: 9,
        y: 6
    }],
    m: [{
        x: 9,
        y: 1
    }, {
        x: 9,
        y: 7
    }],
    c: [{
        x: 9,
        y: 0
    }, {
        x: 9,
        y: 8
    }],
    s: [{
        x: 9,
        y: 3
    }, {
        x: 9,
        y: 5
    }],
    j: [{
        x: 9,
        y: 4
    }],
    B: [{
        x: 3,
        y: 0
    }, {
        x: 3,
        y: 2
    }, {
        x: 3,
        y: 4
    }, {
        x: 3,
        y: 6
    }, {
        x: 3,
        y: 8
    }],
    P: [{
        x: 2,
        y: 1
    }, {
        x: 2,
        y: 7
    }],
    X: [{
        x: 0,
        y: 2
    }, {
        x: 0,
        y: 6
    }],
    M: [{
        x: 0,
        y: 1
    }, {
        x: 0,
        y: 7
    }],
    C: [{
        x: 0,
        y: 0
    }, {
        x: 0,
        y: 8
    }],
    S: [{
        x: 0,
        y: 3
    }, {
        x: 0,
        y: 5
    }],
    J: [{
        x: 0,
        y: 4
    }],
}

window.chessBoard = [
    [`#C1`, `#M1`, `#X1`, `#S1`, `#J1`, `#S2`, `#X2`, `#M2`, `#C2`],
    [``, ``, ``, ``, ``, ``, ``, ``, ``],
    [``, `#P1`, ``, ``, ``, ``, ``, `#P2`, ``],
    [`#B1`, ``, `#B2`, ``, `#B3`, ``, `#B4`, ``, `#B5`],
    [``, ``, ``, ``, ``, ``, ``, ``, ``],
    [``, ``, ``, ``, ``, ``, ``, ``, ``],
    [`#b1`, ``, `#b2`, ``, `#b3`, ``, `#b4`, ``, `#b5`],
    [``, `#p1`, ``, ``, ``, ``, ``, `#p2`, ``],
    [``, ``, ``, ``, ``, ``, ``, ``, ``],
    [`#c1`, `#m1`, `#x1`, `#s1`, `#j1`, `#s2`, `#x2`, `#m2`, `#c2`],
]

var isBlank = function (x, y) {
    if (!!chessBoard[x][y]) return false
    return true
}

var canKillSomebody = function (x, y) {
    if (indexOfMove(allMovePosition, [x, y]) && !!chessBoard[x][y])
        return true
    return false
}

window.getChessPosition = function (id) {
    var indexTemp = Number(id.replace(/[^0-9]/ig, "")) - 1
    if (id.indexOf(`b`) != -1) {
        return chessPosition.b[indexTemp]
    } else if (id.indexOf(`p`) != -1) {
        return chessPosition.p[indexTemp]
    } else if (id.indexOf(`m`) != -1) {
        return chessPosition.m[indexTemp]
    } else if (id.indexOf(`x`) != -1) {
        return chessPosition.x[indexTemp]
    } else if (id.indexOf(`s`) != -1) {
        return chessPosition.s[indexTemp]
    } else if (id.indexOf(`c`) != -1) {
        return chessPosition.c[indexTemp]
    } else if (id.indexOf(`j`) != -1) {
        return chessPosition.j[indexTemp]
    } else if (id.indexOf(`B`) != -1) {
        return chessPosition.B[indexTemp]
    } else if (id.indexOf(`P`) != -1) {
        return chessPosition.P[indexTemp]
    } else if (id.indexOf(`M`) != -1) {
        return chessPosition.M[indexTemp]
    } else if (id.indexOf(`X`) != -1) {
        return chessPosition.X[indexTemp]
    } else if (id.indexOf(`S`) != -1) {
        return chessPosition.S[indexTemp]
    } else if (id.indexOf(`C`) != -1) {
        return chessPosition.C[indexTemp]
    } else if (id.indexOf(`J`) != -1) {
        return chessPosition.J[indexTemp]
    }
}

window.setChessPosition = function (id, x, y) {
    var indexTemp = Number(id.replace(/[^0-9]/ig, "")) - 1
    if (id.indexOf(`b`) != -1) {
        chessPosition.b[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`p`) != -1) {
        chessPosition.p[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`m`) != -1) {
        chessPosition.m[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`x`) != -1) {
        chessPosition.x[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`s`) != -1) {
        chessPosition.s[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`c`) != -1) {
        chessPosition.c[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`j`) != -1) {
        chessPosition.j[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`B`) != -1) {
        chessPosition.B[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`P`) != -1) {
        chessPosition.P[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`M`) != -1) {
        chessPosition.M[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`X`) != -1) {
        chessPosition.X[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`S`) != -1) {
        chessPosition.S[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`C`) != -1) {
        chessPosition.C[indexTemp] = {
            x,
            y
        }
    } else if (id.indexOf(`J`) != -1) {
        chessPosition.J[indexTemp] = {
            x,
            y
        }
    }
}


var chooseWhich = function (id) {
    if (!id) return
    if (!chooseID) { //如果chooseID为空
        preID = id
        preIndex = Number(id.replace(/[^0-9]/ig, "")) - 1
    } else {
        preID = chooseID
        preIndex = index
    }
    chooseID = id
    index = Number(id.replace(/[^0-9]/ig, "")) - 1
    console.log(`触发choosewhich id:`, id, `index:`, index)
}

var hover = function (id) {
    $(id).hover(function () {
        $(this).css({
            "width": "70px",
            "height": "70px"
        })
        $(this).off(`click`).click(function (e) {
            offsetLeft = e.target.offsetLeft
            offsetTop = e.target.offsetTop
            console.log(`qizi位置信息`, chooseID, e.target.offsetLeft, e.target.offsetTop)
            $(this).hide()
            chooseWhich(id)
            if (chessClickStatus == 0) {
                chessClickStatus = 1
            } else {
                chessClickStatus = 2
            }
        })
        isOverChess = true
    }, function () {
        $(this).css({
            "width": "60px",
            "height": "60px"
        })
        isOverChess = false
    })
}

window.redchess = function (player) {
    for (let i = 1; i <= 5; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.b[i - 1].x + `px`
            y = width * chessPosition.b[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.b[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.b[i - 1].y) + `px`
        }

        $(`#b` + i).css({
            "top": x,
            "left": y
        })
        hover(`#b` + i)

    }

    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.p[i - 1].x + `px`
            y = width * chessPosition.p[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.p[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.p[i - 1].y) + `px`
        }
        $(`#p` + i).css({
            "top": x,
            "left": y
        })
        hover(`#p` + i)
    }

    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.x[i - 1].x + `px`
            y = width * chessPosition.x[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.x[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.x[i - 1].y) + `px`
        }
        $(`#x` + i).css({
            "top": x,
            "left": y
        })
        hover(`#x` + i)
    }
    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.m[i - 1].x + `px`
            y = width * chessPosition.m[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.m[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.m[i - 1].y) + `px`
        }
        $(`#m` + i).css({
            "top": x,
            "left": y
        })
        hover(`#m` + i)
    }
    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.c[i - 1].x + `px`
            y = width * chessPosition.c[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.c[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.c[i - 1].y) + `px`
        }
        $(`#c` + i).css({
            "top": x,
            "left": y
        })
        hover(`#c` + i)
    }
    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.s[i - 1].x + `px`
            y = width * chessPosition.s[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.s[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.s[i - 1].y) + `px`
        }
        $(`#s` + i).css({
            "top": x,
            "left": y
        })
        hover(`#s` + i)
    }
    let x, y
    if (player) {
        x = height * chessPosition.j[0].x + `px`
        y = width * chessPosition.j[0].y + `px`
    } else {
        x = height * Math.abs(9 - chessPosition.j[0].x) + `px`
        y = width * Math.abs(8 - chessPosition.j[0].y) + `px`
    }
    $(`#j1`).css({
        "top": x,
        "left": y
    })
    hover(`#j1`)
}

window.blackchess = function (player) {
    for (let i = 1; i <= 5; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.B[i - 1].x + `px`
            y = width * chessPosition.B[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.B[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.B[i - 1].y) + `px`
        }
        $(`#B` + i).css({
            "top": x,
            "left": y
        })
        hover(`#B` + i)
    }

    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.P[i - 1].x + `px`
            y = width * chessPosition.P[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.P[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.P[i - 1].y) + `px`
        }
        $(`#P` + i).css({
            "top": x,
            "left": y
        })
        hover(`#P` + i)
    }

    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.X[i - 1].x + `px`
            y = width * chessPosition.X[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.X[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.X[i - 1].y) + `px`
        }
        $(`#X` + i).css({
            "top": x,
            "left": y
        })
        hover(`#X` + i)
    }
    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.M[i - 1].x + `px`
            y = width * chessPosition.M[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.M[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.M[i - 1].y) + `px`
        }
        $(`#M` + i).css({
            "top": x,
            "left": y
        })
        hover(`#M` + i)
    }
    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.C[i - 1].x + `px`
            y = width * chessPosition.C[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.C[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.C[i - 1].y) + `px`
        }
        $(`#C` + i).css({
            "top": x,
            "left": y
        })
        hover(`#C` + i)
    }
    for (let i = 1; i <= 2; i++) {
        let x, y
        if (player) {
            x = height * chessPosition.S[i - 1].x + `px`
            y = width * chessPosition.S[i - 1].y + `px`
        } else {
            x = height * Math.abs(9 - chessPosition.S[i - 1].x) + `px`
            y = width * Math.abs(8 - chessPosition.S[i - 1].y) + `px`
        }
        $(`#S` + i).css({
            "top": x,
            "left": y
        })
        hover(`#S` + i)
    }
    let x, y
    if (player) {
        x = height * chessPosition.J[0].x + `px`
        y = width * chessPosition.J[0].y + `px`
    } else {
        x = height * Math.abs(9 - chessPosition.J[0].x) + `px`
        y = width * Math.abs(8 - chessPosition.J[0].y) + `px`
    }
    $(`#J1`).css({
        "top": x,
        "left": y
    })
    hover(`#J1`)
}


window.onload = function () {

    $(`#chessboard`).click(function (e) {
        var x, y
        if (message.player == true) {
            boxID1 = `#r_box1`
            boxID2 = `#r_box2`
            boxID3 = `#r_box3`
            anotherBoxID1 = `#b_box1`
            anotherBoxID2 = `#b_box2`
            anotherBoxID3 = `#b_box3`
        } else {
            boxID1 = `#b_box1`
            boxID2 = `#b_box2`
            boxID3 = `#b_box3`
            anotherBoxID1 = `#r_box1`
            anotherBoxID2 = `#r_box2`
            anotherBoxID3 = `#r_box3`
        }

        if (offsetTop >= 0) {
            y = Math.round(offsetLeft / width)
            x = Math.round(offsetTop / height)
        } else {
            y = Math.floor(e.offsetX / width)
            x = Math.floor(e.offsetY / height)
        }
        console.log(e.offsetY, e.offsetX, `位置信息`, offsetLeft, offsetTop, y, x, chooseID)
        offsetTop = -1
        offsetLeft = -1

        $(chooseID).show()

        if (chessClickStatus == 0) {
            $(boxID3).css({
                "display": "none"
            })

            $(boxID2).css({
                "display": "none"
            })

            $(boxID1).css({
                "display": "none",
            })
            chooseID = ``
            console.log(`chessClickStatus = 0,清除box,将chooseID置初值`)
        } else {
            canKill = false
            killID = ``
            if (chessClickStatus == 2 && isOverChess) {
                console.log(preIndex, `开始判断cankill`)
                canKill = canKillSomebody(x, y)
                console.log(preIndex, `判断cankill 结束`, canKill)
                if (canKill) {
                    if (chooseID == `#J1`) {
                        console.log(chessBoard[x][y], x, y)
                        alert(`红棋胜利！`)
                    } else if (chooseID == `#j1`) {
                        console.log(chessBoard[x][y], x, y)
                        alert(`黑棋胜利！`)
                    }
                    $(chooseID).hide()
                    console.log(preID, `hhhhhhhh,kill you`, chooseID)
                    killID = chooseID
                    chooseID = preID
                    index = preIndex
                    chessBoard[x][y] = ``
                }
            }

            if (isOverChess && !canKill) {
                if (canChessOperation()) {
                    $(boxID3).css({
                        "display": "block",
                        "top": height * x + `px`,
                        "left": width * y + `px`
                    })
                    console.log(`设置选中状态`)
                    allMovePosition = getAllMovePosition[chessType(chooseID)](chooseID, x, y)
                }
            }

            if (canKill || (!isOverChess && indexOfMove(allMovePosition, [x, y]))) {
                if (canChessOperation() == false) return

                if (mode == 1) {
                    var chessID = chooseID
                    console.log(message.player, `77777777777777777`)
                    chessMove(x, y, message.player, 0)
                    message.key = chessID
                    message.x = x
                    message.y = y
                    sendMessage()
                } else {
                    chessMove(x, y, true, 0)
                    console.log(Search.checkedIsDead(true), `红方`)
                    console.log(Search.checkedIsDead(false), `黑方`)

                    setTimeout(() => {
                        var result = Search.searchMain(1000)
                        console.log(`AI search result============`, result)
                        if (!result) {
                            alert(`绝杀，红棋胜！`)
                            return
                        }

                        chooseID = result.key
                        chessMove(result.x, result.y, false, 1)
                        console.log(chessBoard)
                    })
                }

            } else {
                console.log(`chess donot move, hide box`, chooseID)
            }
        }

    })

    $(`#regret`).click(function (e) {
        if (mode == 1) {
            if (!chessCharacter) {
                if (confirm(`你确定要悔棋吗？`)) {
                    message.canOpponentRegret = 1
                    message.key = ``
                    message.talk = ``
                    sendMessage()
                    $(`#tips`).html(`等待对手同意...`)
                }
                console.log(regretObj.data)
            } else {
                alert(`亲，只有在你对手的回合才能悔棋哦!`)
            }
        } else {
            if (confirm(`你确定要悔棋吗？`)) {
                regretObj.regret(false)
                regretObj.regret(false)
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
                console.log(regretObj.data)
            }
        }

    })
}