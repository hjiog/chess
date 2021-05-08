import { canChessMove, getBestMove } from './utils'
import { ChessMap, Store, MoveType } from '~/common'

// 希尔排序
const SHELL_STEP = [0, 1, 4, 13, 40, 121, 364, 1093]

export class MoveSort {
  mvs: MoveType[]
  vls: number[]
  index: number
  constructor(isAIRound: boolean, chessboardMap: number[][]) {
    this.mvs = [] // 走法数组，存储当前局面所有走法
    this.vls = [] // 在历史表中，每个走法对应的分值
    this.index = 0

    const willFindRedCamp = Store.isPlayFirst ? !isAIRound : isAIRound
    // debugger
    // 生成全部走法
    const mvsAll = getMoves(willFindRedCamp, chessboardMap)

    for (let i = 0; i < mvsAll.length; i++) {
      const move = mvsAll[i]
      this.mvs.push(move)
      this.vls.push(getBestMove(move)) // 获取历史表中，该走法的值
    }
    shellSort(this.mvs, this.vls) // 根据历史表的分值，对走法进行排序
  }

  // 获得一步排序后的走法。如果走法已经全部获取，则返回0
  next() {
    if (this.index < this.mvs.length) {
      const mv = this.mvs[this.index]
      this.index++
      // debugger
      return mv
    }
  }
}

function getMoves(willFindRedCamp: boolean, chessboardMap: number[][]) {
  let moves: Array<MoveType> = []
  chessboardMap.forEach((row, top) => {
    row.forEach((col, left) => {
      if (canChessMove(col, willFindRedCamp)) {
        const moveResultArray = ChessMap[col].getAllMovePosition({ top, left, chessType: col, ChessBoardMap: chessboardMap })
        // todo 考虑长将走法?
        moves = moves.concat(moveResultArray.map((val) => {
          return {
            originPostion: {
              top,
              left,
            },
            currentPostion: {
              top: val[0],
              left: val[1],
            },
          }
        }))
      }
    })
  })
  return moves
}

function shellSort(mvs: MoveType[], vls: number[]) {
  let stepLevel = 1
  while (SHELL_STEP[stepLevel] < mvs.length) stepLevel++

  stepLevel--
  while (stepLevel > 0) {
    const step = SHELL_STEP[stepLevel]
    for (let i = step; i < mvs.length; i++) {
      const mvBest = mvs[i]
      const vlBest = vls[i]
      let j = i - step
      while (j >= 0 && vlBest > vls[j]) {
        mvs[j + step] = mvs[j]
        vls[j + step] = vls[j]
        j -= step
      }
      mvs[j + step] = mvBest
      vls[j + step] = vlBest
    }
    stepLevel--
  }
}
