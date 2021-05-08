"use strict";
exports.__esModule = true;
exports.alphaBetaSearch = void 0;
var sort_1 = require("./sort");
var utils_1 = require("./utils");
var const_1 = require("./const");
var common_1 = require("~/common");
function alphaBetaSearch(props) {
    var depth = props.depth, chessboardMap = props.chessboardMap, searchResult = props.searchResult;
    var valAlpha = props.valAlpha, valBeta = props.valBeta;
    var isAIRound = (const_1.MINMAXDEPTH & 1) === (depth & 1);
    // 搜索分为以下几个阶段
    // debugger
    // console.log(depth, '====')
    // 1. 到达水平线或将军，则返回局面评价值
    if (depth === 0)
        return utils_1.getEvaluateValue(chessboardMap);
    // 2. 生成全部走法，并根据历史表排序
    var sort = new sort_1.MoveSort(isAIRound, chessboardMap);
    // debugger
    // 3. 逐一走这些走法，并进行递归
    var val = 0;
    var isDead = false;
    for (var mv = sort.next(); mv; mv = sort.next()) {
        var _a = mv, originPostion = _a.originPostion, currentPostion = _a.currentPostion;
        var chessType = chessboardMap[currentPostion.top][currentPostion.left];
        // debugger
        // console.log(mv, 'move', chessType & (ChessTypeEnum.red | ChessTypeEnum.black), chessType & (ChessTypeEnum.j))
        // 能将军
        if (chessType & common_1.ChessTypeEnum.j) {
            // debugger
            // console.log('能将军??', originPostion, currentPostion, chessboardMap)
            return isAIRound ? const_1.MATE_VALUE : -const_1.MATE_VALUE;
        }
        utils_1.setPostion({ originPostion: originPostion, currentPostion: currentPostion, back: false, chessboardMap: chessboardMap });
        isDead = utils_1.checkedIsDead(isAIRound, chessboardMap);
        // 这招棋走完后，己方老将处于被攻击的状态，这是在送死。应该跳过这招棋，继续后面的搜索。
        if (isDead) {
            // console.log('老将被将,撤销这个走法', originPostion, currentPostion, chessboardMap)
            // 撤消这个走法;
            utils_1.setPostion({
                originPostion: currentPostion,
                currentPostion: originPostion,
                back: true,
                chessboardMap: chessboardMap
            });
            continue;
        }
        val = alphaBetaSearch({
            valAlpha: valAlpha,
            valBeta: valBeta,
            depth: depth - 1,
            chessboardMap: chessboardMap,
            searchResult: searchResult
        }); // 递归调用
        // 撤消这个走法;
        utils_1.setPostion({
            originPostion: currentPostion,
            currentPostion: originPostion,
            back: true,
            chessboardMap: chessboardMap
        });
        // 注：Alpha为下界，Beta为上界
        // 取极大值，进行Beta剪枝(电脑回合)
        // debugger
        if (isAIRound) {
            // 4. 进行Alpha-Beta大小判断和截断
            // debugger
            if (val > valAlpha) { // 若这一步棋局价值比下界大,即找到最佳值(对电脑而言,val越大越好)
                // 更新下界
                // todo 更新的值为何能作用到递归函数的入参? ==> 可作用于兄弟节点
                valAlpha = val;
                // 如果回到了根节点，需要记录根节点的最佳走法
                if (depth === const_1.MINMAXDEPTH) {
                    searchResult.currentPostion = currentPostion;
                    searchResult.originPostion = originPostion;
                }
                // valBeta指的是在一个子树中,对手最好的走法能达到的分数,
                // 而你要走的另一条子树若已经达到valBeta值了,就说明这颗树不用往下走了,直接剪枝
                if (valAlpha >= valBeta) {
                    // 找到了好的走法，更新历史表
                    utils_1.setBestMove(mv, depth);
                    // debugger
                    return valBeta; // Beta剪枝
                }
            }
        }
        else {
            // 玩家回合
            // 4. 进行Alpha-Beta大小判断和截断
            // debugger
            if (val < valBeta) { // 若这一步棋局价值比上界小,即找到最佳值(对玩家而言,val越小越好)
                // 更新Beta值
                valBeta = val;
                if (valAlpha >= valBeta) {
                    // 找到了好的走法，更新历史表
                    utils_1.setBestMove(mv, depth);
                    // debugger
                    return valAlpha; // Alpha剪枝
                }
            }
        }
    }
    // debugger
    return isAIRound ? valAlpha : valBeta;
}
exports.alphaBetaSearch = alphaBetaSearch;
