
import { ChessMap, ChessTypeEnum, Store, MoveType, Position } from '~/common'

// 评估棋局 取得棋盘双方棋子价值差，电脑越优势则返回值越大
export function getEvaluateValue(chessboardMap: number[][]) {
  let val = 0
  if (!Store.isPlayFirst) {
    // 电脑先手,红方优势则返回值越大
    chessboardMap.forEach((row, top) => {
      row.forEach((col, left) => {
        if (col & ChessTypeEnum.red)
          val += ChessMap[col].valueMap[top][left]
        else if (col & ChessTypeEnum.black)
          val -= ChessMap[col].valueMap[top][left]
      })
    })
  }
  else {
    // 玩家先手,红方优势则返回值越小
    chessboardMap.forEach((row, top) => {
      row.forEach((col, left) => {
        if (col & ChessTypeEnum.red)
          val -= ChessMap[col].valueMap[top][left]
        else if (col & ChessTypeEnum.black)
          val += ChessMap[col].valueMap[top][left]
      })
    })
  }
  // debugger
  // console.log(val, '========')
  return val
}

// 记录杀死的棋子，用于回退
const killedChess: number[] = []
export function setPostion(
  props: {
    originPostion: Position
    currentPostion: Position
    back: boolean
    chessboardMap: number[][]
  }) {
  const { originPostion, currentPostion, back, chessboardMap } = props

  const currentChess = chessboardMap[originPostion.top][originPostion.left]
  const killingChess = chessboardMap[currentPostion.top][currentPostion.left]

  chessboardMap[currentPostion.top][currentPostion.left] = currentChess

  // 回退
  if (back) {
    const preChess = killedChess.pop()
    chessboardMap[originPostion.top][originPostion.left] = preChess || 0
  }
  else {
    killedChess.push(killingChess)
    chessboardMap[originPostion.top][originPostion.left] = 0
  }
}

export const canChessMove = (type: number, willFindRedCamp: boolean) => willFindRedCamp ? (type & ChessTypeEnum.red) : (type & ChessTypeEnum.black)

export const checkedIsDead = (isAIRound: boolean, chessboardMap: number[][]) => {
  const willFindRedCamp = Store.isPlayFirst ? !isAIRound : isAIRound
  // debugger
  const index = chessboardMap.findIndex((row, top) => {
    const res = row.findIndex((col, left) => {
      if (canChessMove(col, !willFindRedCamp)) {
        const moveResultArray = ChessMap[col].getAllMovePosition({ top, left, chessType: col, ChessBoardMap: chessboardMap })
        const res = moveResultArray.findIndex(([currentTop, currentLeft]) => {
          return (chessboardMap[currentTop][currentLeft] & ChessTypeEnum.j)
        })
        return res !== -1
      }
      return false
    })
    return res !== -1
  })
  return index !== -1
}

export const historyTable = new WeakMap()

// 获取历史表某一走法的值
export function getBestMove(move: MoveType) {
  if (historyTable.has(move))
    return historyTable.get(move)
  return 0
}

// 更新历史表
export function setBestMove(move: MoveType, depth: number) {
  if (historyTable.has(move)) {
    const value = historyTable.get(move) + depth * depth
    historyTable.set(move, value)
  }
  else {
    historyTable.set(move, depth * depth)
  }
}
