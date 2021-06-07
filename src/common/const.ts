import { RulesB, RulesC, RulesJ, RulesM, RulesP, RulesS, RulesX } from './chessRules'
import {
  imgUrl_b,
  imgUrl_p,
  imgUrl_c,
  imgUrl_m,
  imgUrl_x,
  imgUrl_s,
  imgUrl_j,
  imgUrl_B,
  imgUrl_P,
  imgUrl_C,
  imgUrl_M,
  imgUrl_X,
  imgUrl_S,
  imgUrl_J,
  imgUrl_redBox,
  imgUrl_blueBox,
} from './imgImport'
import { ChessTypeEnum, ChessBoxStateEnum, ChessBoardMapType, ChessTypeMap, ChessMapType } from '~/common/types'

// 定义棋子价值
const chessValueB = [
  [9, 9, 9, 11, 13, 11, 9, 9, 9],
  [19, 24, 34, 42, 44, 42, 34, 24, 19],
  [19, 24, 32, 37, 37, 37, 32, 24, 19],
  [19, 23, 27, 29, 30, 29, 27, 23, 19],
  [14, 18, 20, 27, 29, 27, 20, 18, 14],

  [7, 0, 13, 0, 16, 0, 13, 0, 7],
  [7, 0, 7, 0, 15, 0, 7, 0, 7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const chessValueC = [
  [206, 208, 207, 213, 214, 213, 207, 208, 206],
  [206, 212, 209, 216, 233, 216, 209, 212, 206],
  [206, 208, 207, 214, 216, 214, 207, 208, 206],
  [206, 213, 213, 216, 216, 216, 213, 213, 206],
  [208, 211, 211, 214, 215, 214, 211, 211, 208],

  [208, 212, 212, 214, 215, 214, 212, 212, 208],
  [204, 209, 204, 212, 214, 212, 204, 209, 204],
  [198, 208, 204, 212, 212, 212, 204, 208, 198],
  [200, 208, 206, 212, 200, 212, 206, 208, 200],
  [194, 206, 204, 212, 200, 212, 204, 206, 194],
]
const chessValueM = [
  [90, 90, 90, 96, 90, 96, 90, 90, 90],
  [90, 96, 103, 97, 94, 97, 103, 96, 90],
  [92, 98, 99, 103, 99, 103, 99, 98, 92],
  [93, 108, 100, 107, 100, 107, 100, 108, 93],
  [90, 100, 99, 103, 104, 103, 99, 100, 90],

  [90, 98, 101, 102, 103, 102, 101, 98, 90],
  [92, 94, 98, 95, 98, 95, 98, 94, 92],
  [93, 92, 94, 95, 92, 95, 94, 92, 93],
  [85, 90, 92, 93, 78, 93, 92, 90, 85],
  [88, 85, 90, 88, 90, 88, 90, 85, 88],
]
const chessValueP = [

  [100, 100, 96, 91, 90, 91, 96, 100, 100],
  [98, 98, 96, 92, 89, 92, 96, 98, 98],
  [97, 97, 96, 91, 92, 91, 96, 97, 97],
  [96, 99, 99, 98, 100, 98, 99, 99, 96],
  [96, 96, 96, 96, 100, 96, 96, 96, 96],

  [95, 96, 99, 96, 100, 96, 99, 96, 95],
  [96, 96, 96, 96, 96, 96, 96, 96, 96],
  [97, 96, 100, 99, 101, 99, 100, 96, 97],
  [96, 97, 98, 98, 98, 98, 98, 97, 96],
  [96, 96, 97, 99, 99, 99, 97, 96, 96],
]
const chessValueS = [
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
  [0, 0, 0, 0, 23, 0, 0, 0, 0],
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
  [0, 0, 0, 0, 23, 0, 0, 0, 0],
  [0, 0, 0, 20, 0, 20, 0, 0, 0],
]
const chessValueX = [
  [0, 0, 20, 0, 0, 0, 20, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 23, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 20, 0, 0, 0, 20, 0, 0],

  [0, 0, 20, 0, 0, 0, 20, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [18, 0, 0, 0, 23, 0, 0, 0, 18],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 20, 0, 0, 0, 20, 0, 0],
]
const chessValueJ = [
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
  [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
]

const _ChessMap = {
  [ChessTypeEnum.red | ChessTypeEnum.b]: {
    url: imgUrl_b,
    position: [{ top: 6, left: 0 }, { top: 6, left: 2 }, { top: 6, left: 4 }, { top: 6, left: 6 }, { top: 6, left: 8 }],
    getAllMovePosition: RulesB,
    valueMap: chessValueB,
  },
  [ChessTypeEnum.red | ChessTypeEnum.c]: {
    url: imgUrl_c,
    position: [{ top: 9, left: 0 }, { top: 9, left: 8 }],
    getAllMovePosition: RulesC,
    valueMap: chessValueC,
  },
  [ChessTypeEnum.red | ChessTypeEnum.m]: {
    url: imgUrl_m,
    position: [{ top: 9, left: 1 }, { top: 9, left: 7 }],
    getAllMovePosition: RulesM,
    valueMap: chessValueM,
  },
  [ChessTypeEnum.red | ChessTypeEnum.p]: {
    url: imgUrl_p,
    position: [{ top: 7, left: 1 }, { top: 7, left: 7 }],
    getAllMovePosition: RulesP,
    valueMap: chessValueP,
  },
  [ChessTypeEnum.red | ChessTypeEnum.s]: {
    url: imgUrl_s,
    position: [{ top: 9, left: 3 }, { top: 9, left: 5 }],
    getAllMovePosition: RulesS,
    valueMap: chessValueS,
  },
  [ChessTypeEnum.red | ChessTypeEnum.x]: {
    url: imgUrl_x,
    position: [{ top: 9, left: 2 }, { top: 9, left: 6 }],
    getAllMovePosition: RulesX,
    valueMap: chessValueX,
  },
  [ChessTypeEnum.red | ChessTypeEnum.j]: {
    url: imgUrl_j,
    position: [{ top: 9, left: 4 }],
    getAllMovePosition: RulesJ,
    valueMap: chessValueJ,
  },
  [ChessTypeEnum.black | ChessTypeEnum.b]: {
    url: imgUrl_B,
    position: [{ top: 3, left: 0 }, { top: 3, left: 2 }, { top: 3, left: 4 }, { top: 3, left: 6 }, { top: 3, left: 8 }],
    getAllMovePosition: RulesB,
    valueMap: [...chessValueB].reverse(),
  },
  [ChessTypeEnum.black | ChessTypeEnum.c]: {
    url: imgUrl_C,
    position: [{ top: 0, left: 0 }, { top: 0, left: 8 }],
    getAllMovePosition: RulesC,
    valueMap: [...chessValueC].reverse(),
  },
  [ChessTypeEnum.black | ChessTypeEnum.m]: {
    url: imgUrl_M,
    position: [{ top: 0, left: 1 }, { top: 0, left: 7 }],
    getAllMovePosition: RulesM,
    valueMap: [...chessValueM].reverse(),
  },
  [ChessTypeEnum.black | ChessTypeEnum.p]: {
    url: imgUrl_P,
    position: [{ top: 2, left: 1 }, { top: 2, left: 7 }],
    getAllMovePosition: RulesP,
    valueMap: [...chessValueP].reverse(),
  },
  [ChessTypeEnum.black | ChessTypeEnum.s]: {
    url: imgUrl_S,
    position: [{ top: 0, left: 3 }, { top: 0, left: 5 }],
    getAllMovePosition: RulesS,
    valueMap: [...chessValueS].reverse(),
  },
  [ChessTypeEnum.black | ChessTypeEnum.x]: {
    url: imgUrl_X,
    position: [{ top: 0, left: 2 }, { top: 0, left: 6 }],
    getAllMovePosition: RulesX,
    valueMap: [...chessValueX].reverse(),
  },
  [ChessTypeEnum.black | ChessTypeEnum.j]: {
    url: imgUrl_J,
    position: [{ top: 0, left: 4 }],
    getAllMovePosition: RulesJ,
    valueMap: [...chessValueJ].reverse(),
  },
}

export const initChessMap = () => {
  const realChessMap: ChessMapType = {}
  Object.keys(_ChessMap).forEach((key) => {
    const realKey = Number(key)
    realChessMap[realKey] = {
      ..._ChessMap[realKey],
      position: [..._ChessMap[realKey].position],
    }
  })
  return realChessMap
}

export const ChessMap = initChessMap()

export const ColorBoxUrlMap = {
  [ChessBoxStateEnum.red]: imgUrl_redBox,
  [ChessBoxStateEnum.black]: imgUrl_blueBox,
}

// 建立10*9的矩阵，存储棋盘棋子的位置
const getChessBoardMap = (isNumber: boolean) => {
  const _chessBoardMap = new Array(10)
  for (let i = 0; i < _chessBoardMap.length; i++) {
    _chessBoardMap[i] = new Array(9)
    for (let j = 0; j < _chessBoardMap[i].length; j++)
      _chessBoardMap[i][j] = isNumber ? 0 : []
  }
  return _chessBoardMap
}

const initChessTypeMap = (chessTypeMap: ChessTypeMap) => {
  Object.keys(ChessMap).forEach((key) => {
    const { position } = ChessMap[key as any]
    position.forEach((pos) => {
      chessTypeMap[pos.top][pos.left] = Number(key)
    })
  })

  return chessTypeMap
}

export const initChessBoardMap = () => {
  return {
    chessTypeMap: initChessTypeMap(getChessBoardMap(true)),
    chessRefMap: getChessBoardMap(false),
  }
}

export const ChessBoardMap: ChessBoardMapType = initChessBoardMap()
