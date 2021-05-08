import { ChessTypeEnum, ChessTypeMap } from '~/common/types'
import { Store } from '~/common'

// 注意:左上角才是原点,因此,RiverTop指的是楚河汉界的下边界
const RiverTop = 5
const RiverBottom = 4
const ChessBoardTop = 9
const ChessBoardBottom = 0
const ChessBoardLeft = 0
const ChessBoardRight = 8

const checkCanMove = (chessType1: number, chessType2: number) => {
  return !(chessType1 & chessType2 & ChessTypeEnum.colorMask)
}

const checkIsBottomPlayer = (chessType: number) => {
  return Store.isPlayFirst ? chessType & ChessTypeEnum.red : chessType & ChessTypeEnum.black
}

// 兵
export const RulesB = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  // debugger
  const isPlayerBottom = checkIsBottomPlayer(chessType)
  let chessType2 = 0
  if (isPlayerBottom && top > ChessBoardBottom) {
    // 底部方向上检索
    chessType2 = ChessBoardMap[top - 1][left]
    if (checkCanMove(chessType, chessType2))
      res.push([top - 1, left])
  }
  else if (top < ChessBoardTop) {
    // 顶部方向下检索
    chessType2 = ChessBoardMap[top + 1][left]
    if (checkCanMove(chessType, chessType2))
      res.push([top + 1, left])
  }
  // 兵过河左右查找
  if ((top < RiverTop && isPlayerBottom) || (top > RiverBottom && !isPlayerBottom)) {
    if (left > ChessBoardLeft) {
      chessType2 = ChessBoardMap[top][left - 1]
      if (checkCanMove(chessType, chessType2))
        res.push([top, left - 1])
    }

    if (left < ChessBoardRight) {
      chessType2 = ChessBoardMap[top][left + 1]
      if (checkCanMove(chessType, chessType2))
        res.push([top, left + 1])
    }
  }
  return res
}

// 马
export const RulesM = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  // 1点
  if (top - 2 >= ChessBoardBottom && left + 1 <= ChessBoardRight && !ChessBoardMap[top - 1][left] && checkCanMove(chessType, ChessBoardMap[top - 2][left + 1])) res.push([top - 2, left + 1])
  // 2点
  if (top - 1 >= ChessBoardBottom && left + 2 <= ChessBoardRight && !ChessBoardMap[top][left + 1] && checkCanMove(chessType, ChessBoardMap[top - 1][left + 2])) res.push([top - 1, left + 2])
  // 4点
  if (top + 1 <= ChessBoardTop && left + 2 <= ChessBoardRight && !ChessBoardMap[top][left + 1] && checkCanMove(chessType, ChessBoardMap[top + 1][left + 2])) res.push([top + 1, left + 2])
  // 5点
  if (top + 2 <= ChessBoardTop && left + 1 <= ChessBoardRight && !ChessBoardMap[top + 1][left] && checkCanMove(chessType, ChessBoardMap[top + 2][left + 1])) res.push([top + 2, left + 1])
  // 7点
  if (top + 2 <= ChessBoardTop && left - 1 >= ChessBoardLeft && !ChessBoardMap[top + 1][left] && checkCanMove(chessType, ChessBoardMap[top + 2][left - 1])) res.push([top + 2, left - 1])
  // 8点
  if (top + 1 <= ChessBoardTop && left - 2 >= ChessBoardLeft && !ChessBoardMap[top][left - 1] && checkCanMove(chessType, ChessBoardMap[top + 1][left - 2])) res.push([top + 1, left - 2])
  // 10点
  if (top - 1 >= ChessBoardBottom && left - 2 >= ChessBoardLeft && !ChessBoardMap[top][left - 1] && checkCanMove(chessType, ChessBoardMap[top - 1][left - 2])) res.push([top - 1, left - 2])
  // 11点
  if (top - 2 >= ChessBoardBottom && left - 1 >= ChessBoardLeft && !ChessBoardMap[top - 1][left] && checkCanMove(chessType, ChessBoardMap[top - 2][left - 1])) res.push([top - 2, left - 1])

  return res
}

// 炮
export const RulesP = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  // 上检索
  let n = 0
  for (let i = top - 1; i >= ChessBoardBottom; i--) {
    if (ChessBoardMap[i][left]) {
      if (n === 0) {
        n++
        continue
      }
      else {
        if (checkCanMove(chessType, ChessBoardMap[i][left])) res.push([i, left])
        break
      }
    }
    else {
      if (n === 0) res.push([i, left])
    }
  }
  // 下检索
  n = 0
  for (let i = top + 1; i <= ChessBoardTop; i++) {
    if (ChessBoardMap[i][left]) {
      if (n === 0) {
        n++
        continue
      }
      else {
        if (checkCanMove(chessType, ChessBoardMap[i][left])) res.push([i, left])
        break
      }
    }
    else {
      if (n === 0) res.push([i, left])
    }
  }
  // 左检索
  n = 0
  for (let i = left - 1; i >= ChessBoardLeft; i--) {
    if (ChessBoardMap[top][i]) {
      if (n === 0) {
        n++
        continue
      }
      else {
        if (checkCanMove(chessType, ChessBoardMap[top][i])) res.push([top, i])
        break
      }
    }
    else {
      if (n === 0) res.push([top, i])
    }
  }
  // 右检索
  n = 0
  for (let i = left + 1; i <= ChessBoardRight; i++) {
    if (ChessBoardMap[top][i]) {
      if (n === 0) {
        n++
        continue
      }
      else {
        if (checkCanMove(chessType, ChessBoardMap[top][i])) res.push([top, i])
        break
      }
    }
    else {
      if (n === 0) res.push([top, i])
    }
  }
  return res
}

// 车
export const RulesC = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  // 上检索
  for (let i = top - 1; i >= ChessBoardBottom; i--) {
    if (!ChessBoardMap[i][left]) {
      res.push([i, left])
      continue
    }
    else if (checkCanMove(chessType, ChessBoardMap[i][left])) {
      res.push([i, left])
    }
    break
  }
  // 下检索
  for (let i = top + 1; i <= ChessBoardTop; i++) {
    if (!ChessBoardMap[i][left]) {
      res.push([i, left])
      continue
    }
    else if (checkCanMove(chessType, ChessBoardMap[i][left])) {
      res.push([i, left])
    }
    break
  }
  // 左检索
  for (let i = left - 1; i >= ChessBoardLeft; i--) {
    if (!ChessBoardMap[top][i]) {
      res.push([top, i])
      continue
    }
    else if (checkCanMove(chessType, ChessBoardMap[top][i])) {
      res.push([top, i])
    }
    break
  }
  // 右检索
  for (let i = left + 1; i <= ChessBoardRight; i++) {
    if (!ChessBoardMap[top][i]) {
      res.push([top, i])
      continue
    }
    else if (checkCanMove(chessType, ChessBoardMap[top][i])) {
      res.push([top, i])
    }
    break
  }
  return res
}

// 象
export const RulesX = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  let chessType2 = 0
  const isPlayerBottom = checkIsBottomPlayer(chessType)
  // 4点半
  if (top + 2 < 10 && left + 2 < ChessBoardTop && !ChessBoardMap[top + 1][left + 1]) {
    if (isPlayerBottom || (top + 2 <= 4 && !isPlayerBottom)) {
      chessType2 = ChessBoardMap[top + 2][left + 2]
      if (checkCanMove(chessType, chessType2)) res.push([top + 2, left + 2])
    }
  }
  // 7点半
  if (top + 2 < 10 && left - 2 >= ChessBoardLeft && !ChessBoardMap[top + 1][left - 1]) {
    if (isPlayerBottom || (top + 2 <= 4 && !isPlayerBottom)) {
      chessType2 = ChessBoardMap[top + 2][left - 2]
      if (checkCanMove(chessType, chessType2)) res.push([top + 2, left - 2])
    }
  }
  // 1点半
  if (top - 2 >= ChessBoardBottom && left + 2 < ChessBoardTop && !ChessBoardMap[top - 1][left + 1]) {
    if ((top - 2 >= 5 && isPlayerBottom) || !isPlayerBottom) {
      chessType2 = ChessBoardMap[top - 2][left + 2]
      if (checkCanMove(chessType, chessType2)) res.push([top - 2, left + 2])
    }
  }
  // 10点半
  if (top - 2 >= ChessBoardBottom && left - 2 >= ChessBoardLeft && !ChessBoardMap[top - 1][left - 1]) {
    if ((top - 2 >= 5 && isPlayerBottom) || !isPlayerBottom) {
      chessType2 = ChessBoardMap[top - 1][left - 1]
      if (checkCanMove(chessType, chessType2)) res.push([top - 2, left - 2])
    }
  }
  return res
}

// 士
export const RulesS = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  let chessType2 = 0
  const isPlayerBottom = checkIsBottomPlayer(chessType)
  // 4点半
  if ((left + 1 <= 5 && top < ChessBoardTop && isPlayerBottom) || (top + 1 <= 2 && left + 1 <= 5 && !isPlayerBottom)) {
    chessType2 = ChessBoardMap[top + 1][left + 1]
    if (checkCanMove(chessType, chessType2)) res.push([top + 1, left + 1])
  }
  // 7点半
  if ((left - 1 >= 3 && top < ChessBoardTop && isPlayerBottom) || (top + 1 <= 2 && left - 1 >= 3 && !isPlayerBottom)) {
    chessType2 = ChessBoardMap[top + 1][left - 1]
    if (checkCanMove(chessType, chessType2)) res.push([top + 1, left - 1])
  }
  // 1点半
  if ((top - 1 >= 7 && left + 1 <= 5 && isPlayerBottom) || (left + 1 <= 5 && top > ChessBoardBottom && !isPlayerBottom)) {
    chessType2 = ChessBoardMap[top - 1][left + 1]
    if (checkCanMove(chessType, chessType2)) res.push([top - 1, left + 1])
  }
  // 10点半
  if ((top - 1 >= 7 && left - 1 >= 3 && isPlayerBottom) || (left - 1 >= 3 && top > ChessBoardBottom && !isPlayerBottom)) {
    chessType2 = ChessBoardMap[top - 1][left - 1]
    if (checkCanMove(chessType, chessType2)) res.push([top - 1, left - 1])
  }
  return res
}

// 将
export const RulesJ = (props: {top: number; left: number; chessType: number;ChessBoardMap: ChessTypeMap}) => {
  const { top, left, chessType, ChessBoardMap } = props
  const res = []
  let chessType2 = 0
  const isPlayerBottom = checkIsBottomPlayer(chessType)

  // 下
  if ((top + 1 <= ChessBoardTop && isPlayerBottom) || (top + 1 <= 2 && !isPlayerBottom)) {
    chessType2 = ChessBoardMap[top + 1][left]
    if (checkCanMove(chessType, chessType2)) res.push([top + 1, left])
  }

  // 上
  if ((top - 1 >= 7 && isPlayerBottom) || (top - 1 >= ChessBoardBottom && !isPlayerBottom)) {
    chessType2 = ChessBoardMap[top - 1][left]
    if (checkCanMove(chessType, chessType2)) res.push([top - 1, left])
  }

  // 老将对老将的情况
  if (isPlayerBottom) {
    for (let i = top - 1; i >= ChessBoardBottom; i--) {
      chessType2 = ChessBoardMap[i][left]
      if (chessType2 === 0) {
        continue
      }
      else if (chessType2 & ChessTypeEnum.j) {
        res.push([i, left])
        break
      }
      else { break }
    }
  }
  else {
    for (let i = top + 1; i <= ChessBoardTop; i++) {
      chessType2 = ChessBoardMap[i][left]
      if (chessType2 === 0) {
        continue
      }
      else if (chessType2 & ChessTypeEnum.j) {
        res.push([i, left])
        break
      }
      else { break }
    }
  }

  // 右
  if (left + 1 <= 5) {
    chessType2 = ChessBoardMap[top][left + 1]
    if (checkCanMove(chessType, chessType2)) res.push([top, left + 1])
  }

  // 左
  if (left - 1 >= 3) {
    chessType2 = ChessBoardMap[top][left - 1]
    if (checkCanMove(chessType, chessType2)) res.push([top, left - 1])
  }

  return res
}
