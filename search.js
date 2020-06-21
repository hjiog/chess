"use strict";

var MINMAXDEPTH = 3; // 搜索的深度
var MATE_VALUE = 99999;
window.Search = {}
window.historyTable = []

Search.searchMain = function (millis) {
    this.mvResult = 0; // 搜索出的走法
    // this.maxMinSearch();	// 调用极大极小搜索算法
    // this.negaMaxSearch(MINMAXDEPTH)//调用负极大值搜索
    // this.alphaBetaSearch(-99999, 99999, MINMAXDEPTH)
    this.alphaBetaSearch2(-99999, 99999, MINMAXDEPTH, false)
    return this.mvResult; // 返回搜索结果
    // var allMillis = 0

    // var t = new Date().getTime();	// 当前时间 距离1970-01-01的毫秒数

    // // 迭代加深搜索
    // for (var i = 1; i <= MINMAXDEPTH; i++) {
    //     var vl = this.alphaBetaSearch2(-99999, 99999, i);
    //     allMillis = new Date().getTime() - t;	// 已经花费的时间
    //     if (allMillis > millis) {				// 时间用完了，不再搜索
    //         break;
    //     }
    //     if (vl > 99999 || vl < -99999) {	// 胜负已分，不用继续搜索
    //         break;
    //     }
    // }

    // return this.mvResult;
}


// 希尔排序
var SHELL_STEP = [0, 1, 4, 13, 40, 121, 364, 1093];

function shellSort(mvs, vls) {
    var stepLevel = 1;
    while (SHELL_STEP[stepLevel] < mvs.length) {
        stepLevel++;
    }
    stepLevel--;
    while (stepLevel > 0) {
        var step = SHELL_STEP[stepLevel];
        for (var i = step; i < mvs.length; i++) {
            var mvBest = mvs[i];
            var vlBest = vls[i];
            var j = i - step;
            while (j >= 0 && vlBest > vls[j]) {
                mvs[j + step] = mvs[j];
                vls[j + step] = vls[j];
                j -= step;
            }
            mvs[j + step] = mvBest;
            vls[j + step] = vlBest;
        }
        stepLevel--;
    }
}

function MoveSort(camp) {
    this.mvs = []; // 走法数组，存储当前局面所有走法
    this.vls = []; // 在历史表中，每个走法对应的分值
    this.index = 0;

    // var mvsAll = pos.generateMoves();						// 生成全部走法
    let mvsAll = AI.getMoves(camp);

    for (var i = 0; i < mvsAll.length; i++) {
        let move = mvsAll[i];

        this.mvs.push(move);
        var historyIndexRes = historyIndex(move)
        this.vls.push(historyTable[historyIndexRes]); // 获取历史表中，该走法的值
    }
    shellSort(this.mvs, this.vls); // 根据历史表的分值，对走法进行排序
}

// 获得一步排序后的走法。如果走法已经全部获取，则返回0
MoveSort.prototype.next = function () {
    while (this.index < this.mvs.length) {
        var mv = this.mvs[this.index];
        this.index++;
        return mv;
    }
    return 0;
}

var historyIndex = function (mv) {
    let key = mv[4];
    let x = mv[2];
    let y = mv[3];
    var keyList = [b1, b2, b3, b4, b5, p1, p2, c1, c2, m1, m2, x1, x2, s1, s2, j1,
        B1, B2, B3, B4, B5, P1, P2, C1, C2, M1, M2, X1, X2, S1, S2, J1
    ];
    for (var i = 0; i < keyList.length; i++) {
        if (key.indexOf(keyList[i]) != -1) {
            return i * 90 + (9 * x + y)
        }
    }
}

// 更新历史表
Search.setBestMove = function (mv, depth) {
    historyTable[historyIndex(mv)] += depth * depth;
}

// 超出边界的Alpha-Beta搜索
Search.alphaBetaSearch2 = function (vlAlpha_, vlBeta, depth, isMy) {
    var vlAlpha = vlAlpha_; // 初始最优值，不再是负无穷

    // 搜索分为以下几个阶段

    // 1. 到达水平线，则返回局面评价值
    if (depth == 0) {
        if ((MINMAXDEPTH & 1) == 0) {
            return -AI.evaluate()
        }
        return AI.evaluate()
    }

    // 2. 初始化最佳值和最佳走法
    var vlBest = -99999; // 这样可以知道，是否一个走法都没走过(杀棋)
    var mvBest = 0; // 这样可以知道，是否搜索到了Beta截断或PV走法，以便保存到历史表

    // 3. 生成全部走法，并根据历史表排序
    // console.log(`=============================生成全部走法，并根据历史表排序`,depth)
    // var sort = new MoveSort(depth);
    var sort = new MoveSort(isMy);

    // 4. 逐一走这些走法，并进行递归
    var mv;
    var vl = 0;

    while ((mv = sort.next())) {
        let key = mv[4];
        let oldX = mv[0];
        let oldY = mv[1];
        let newX = mv[2];
        let newY = mv[3];
        let clearKey = chessBoard[newX][newY];

        chessBoard[newX][newY] = key;
        chessBoard[oldX][oldY] = ``;

        // if ((depth & 1) == 0) {
        //     console.log(`====================1111`, mv)
        // }


        // if (this.checkedIsDead(depth)) {
        if (this.checkedIsDead(isMy)) {
            // 这招棋走完后，老将处于被攻击的状态，这是在送死。应该跳过这招棋，继续后面的搜索。
            //撤消这个走法;　 
            // console.warn(`老将处于被攻击的状态，注意了`, mv)
            chessBoard[oldX][oldY] = key;
            chessBoard[newX][newY] = clearKey;
            continue;
        }

        vl = -this.alphaBetaSearch2(-vlBeta, -vlAlpha, depth - 1, !isMy); // 递归调用，注意有三个负号，并且Alpha和Beta调换位置
        //撤消这个走法;　 
        chessBoard[oldX][oldY] = key;
        chessBoard[newX][newY] = clearKey;

        // 5. 进行Alpha-Beta大小判断和截断
        if (vl > vlBest) { // 找到最佳值
            // console.log(` 找到最佳值`, key, newX, newY, vl)
            vlBest = vl; // "vlBest"就是目前要返回的最佳值，可能超出Alpha-Beta边界
            if (vl >= vlBeta) { // 找到一个Beta走法
                mvBest = mv; // Beta走法要保存到历史表
                break; // Beta截断
            }
            if (vl > vlAlpha) { // 找到一个PV走法
                vlAlpha = vl; // 缩小Alpha-Beta边界
                mvBest = mv; // PV走法要保存到历史表
                // if (this.pos.distance == 0) {	// 回到了根节点，记录根节点的最佳走法
                //     this.mvResult = mv;
                // }
                // 如果回到了根节点，需要记录根节点的最佳走法
                if (depth == MINMAXDEPTH) {
                    // this.mvResult = mv;
                    this.mvResult = {
                        "key": key,
                        "x": newX,
                        "y": newY,
                        "value": vlBest
                    }
                }
            }
        }
    }

    // 6. 所有走法都搜索完了，把最佳走法保存到历史表，返回最佳值
    if (vlBest == -99999) {
        // 根据杀棋步数给出评价
        return vlBest + depth
    }
    if (mvBest != 0) {
        // 找到了好的走法，更新历史表
        this.setBestMove(mvBest, depth);
    }

    return vlBest;
}

Search.checkedIsDead = function (camp) {
    let ID, j, m, c, p
    // if ((camp & 1) == 0) {
    if (camp) {
        ID = `#j1`
        j = `J`
        m = `M`
        c = `C`
        p = `P`
    } else {
        ID = `#J1`
        j = `j`
        m = `m`
        c = `c`
        p = `p`
    }

    var pos = getChessPosition(ID)

    // 判断对方兵是否攻击到己方老将
    if (camp == true) {
        if ((pos.x - 1 >= 0 && chessBoard[pos.x - 1][pos.y].indexOf(`B`) != -1) ||
            (pos.y + 1 <= 8 && chessBoard[pos.x][pos.y + 1].indexOf(`B`) != -1) ||
            (pos.y - 1 >= 0 && chessBoard[pos.x][pos.y - 1].indexOf(`B`) != -1)) {
            //console.warn(`B`)
            return true
        }
    } else {
        if ((pos.x + 1 <= 9 && chessBoard[pos.x + 1][pos.y].indexOf(`b`) != -1) ||
            (pos.y + 1 <= 8 && chessBoard[pos.x][pos.y + 1].indexOf(`b`) != -1) ||
            (pos.y - 1 >= 0 && chessBoard[pos.x][pos.y - 1].indexOf(`b`) != -1)) {
            //console.warn(`b`)
            return true
        }
    }


    // 判断对方马是否攻击到己方老将
    for (var i = -1; i <= 1; i += 2) {
        for (var z = -1; z <= 1; z += 2) {
            if (pos.x + i + i <= 9 && pos.x + i + i >= 0 && pos.y + z >= 0 && pos.y + z <= 8) {
                if (!chessBoard[pos.x + i][pos.y + z]) {
                    if (chessBoard[pos.x + i + i][pos.y + z].indexOf(m) != -1) {
                        //console.warn(m, chessBoard[pos.x + i + i][pos.y + z], pos.x + i + i, pos.y + z, pos)
                        return true
                    }
                }

            }
            if (pos.x + i <= 9 && pos.x + i >= 0 && pos.y + z + z >= 0 && pos.y + z + z <= 8) {
                if (!chessBoard[pos.x + i][pos.y + z]) {
                    if (chessBoard[pos.x + i][pos.y + z + z].indexOf(m) != -1) {
                        //console.warn(m, chessBoard[pos.x + i][pos.y + z + z], pos.x + i, pos.y + z + z, pos)
                        return true
                    }
                }

            }
        }
    }

    // 判断对方的车、炮是攻击到了己方老将，以及将帅是否对脸

    //上检索
    var n = 0;
    for (var i = pos.x - 1; i >= 0; i--) {
        if (chessBoard[i][pos.y]) {
            if (n == 0) {
                if (chessBoard[i][pos.y].indexOf(c) != -1 || chessBoard[i][pos.y].indexOf(j) != -1) {
                    //console.warn(c, j, chessBoard[i][pos.y], i, pos.y, pos)
                    return true
                }
                n++;
                continue;
            } else {
                if (chessBoard[i][pos.y].indexOf(p) != -1) {
                    //console.warn(p, chessBoard[i][pos.y], i, pos.y, pos)
                    return true
                }
                break
            }
        }
    }
    //下检索
    var n = 0;
    for (var i = pos.x + 1; i <= 9; i++) {
        if (chessBoard[i][pos.y]) {
            if (n == 0) {
                if (chessBoard[i][pos.y].indexOf(c) != -1 || chessBoard[i][pos.y].indexOf(j) != -1) {
                    //console.warn(c, j, chessBoard[i][pos.y], i, pos.y, pos)
                    return true
                }
                n++;
                continue;
            } else {
                if (chessBoard[i][pos.y].indexOf(p) != -1) {
                    //console.warn(p, chessBoard[i][pos.y], i, pos.y, pos)
                    return true
                }
                break
            }
        }
    }
    //左检索
    var n = 0;
    for (let i = pos.y - 1; i >= 0; i--) {
        if (chessBoard[pos.x][i]) {
            if (n == 0) {
                if (chessBoard[pos.x][i].indexOf(c) != -1) {
                    //console.warn(c, chessBoard[pos.x][i], pos.x, i, pos)
                    return true
                }
                n++;
                continue;
            } else {
                if (chessBoard[pos.x][i].indexOf(p) != -1) {
                    //console.warn(p, chessBoard[pos.x][i], pos.x, i, pos)
                    return true
                }
                break
            }
        }
    }
    //右检索
    var n = 0;
    for (var i = pos.y + 1; i <= 8; i++) {
        if (chessBoard[pos.x][i]) {
            if (n == 0) {
                if (chessBoard[pos.x][i].indexOf(c) != -1) {
                    //console.warn(c, chessBoard[pos.x][i], pos.x, i, pos)
                    return true
                }
                n++;
                continue;
            } else {
                if (chessBoard[pos.x][i].indexOf(p) != -1) {
                    //console.warn(p, chessBoard[pos.x][i], pos.x, i, pos)
                    return true
                }
                break
            }
        }
    }
    return false
}