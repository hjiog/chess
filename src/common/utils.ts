
import { computed, reactive } from 'vue'
import {
  ChessBoxStateMap,
  ChessActivingState,
  ChessBoxStateEnum,
  ChessBoardMap,
  ChessTypeEnum,
  Store,
  initChessBoardMap,
  initChessMap,
  Position,
} from '~/common'

export const getChessBoxState = computed(() => {
  const activingColorState = ChessActivingState.value & ChessBoxStateEnum.colorMask
  const activedColorState = activingColorState ^ ChessBoxStateEnum.colorMask
  const currentChessState = ChessBoxStateMap[ChessBoxStateEnum.currentState | activingColorState]
  const previousChessState = ChessBoxStateMap[ChessBoxStateEnum.previousState | activingColorState]
  const res = {
    currentChessState,
    previousChessState,
    activedColorState,
    activingColorState,
  }
  return res
})

export const initStatus = (isPlayFirst: boolean) => {
  const realChessMap = initChessMap()
  const realChessBoardMap = initChessBoardMap()
  ChessBoardMap.chessRefMap = realChessBoardMap.chessRefMap
  ChessBoardMap.chessTypeMap = realChessBoardMap.chessTypeMap

  const preRedBox = ChessBoxStateMap[ChessBoxStateEnum.red | ChessBoxStateEnum.previousState]
  const currentRedBox = ChessBoxStateMap[ChessBoxStateEnum.red | ChessBoxStateEnum.currentState]
  const preBlackBox = ChessBoxStateMap[ChessBoxStateEnum.black | ChessBoxStateEnum.previousState]
  const currentBlackBox = ChessBoxStateMap[ChessBoxStateEnum.black | ChessBoxStateEnum.currentState]
  const initVal = -1
  preRedBox.top = initVal
  preRedBox.left = initVal
  currentRedBox.top = initVal
  currentRedBox.left = initVal
  preBlackBox.top = initVal
  preBlackBox.left = initVal
  currentBlackBox.top = initVal
  currentBlackBox.left = initVal

  Store.isPlayFirst = isPlayFirst
  ChessActivingState.value = ChessTypeEnum.red

  if (!isPlayFirst) {
    // exchange position and valuemap
    const chessKeys = Object.keys(realChessMap)
    const chessTypeSet = new Set()
    // debugger
    for (let i = 0; i < chessKeys.length; i++) {
      const chessKey = Number(chessKeys[i])
      const colorType = chessKey & ChessTypeEnum.colorMask
      const anotherColorType = colorType ^ ChessTypeEnum.colorMask
      const chessType = chessKey - colorType
      const anotherChessKey = chessType + anotherColorType

      // debugger
      if (chessTypeSet.has(chessType))
        continue

      chessTypeSet.add(chessType)

      const chessVal1 = realChessMap[chessKey]
      const chessVal2 = realChessMap[anotherChessKey]

      // console.log(chessKey, chessVal1, anotherChessKey, chessVal2, realChessMap)

      const temp = { ...chessVal1 }
      chessVal1.position = chessVal2.position
      chessVal1.valueMap = chessVal2.valueMap
      chessVal2.position = temp.position
      chessVal2.valueMap = temp.valueMap
    }

    ChessBoardMap.chessTypeMap.reverse()
  }
  return realChessMap
}

type HistoryType = {pos: Position;key: number}
const historyHeap: Array<Array<HistoryType>> = reactive([])
export const getHistoryLength = () => historyHeap.length
export const recordHistory = (origin: HistoryType, destination: HistoryType) => {
  historyHeap.push([origin, destination])
}

export const restoreHistory = () => {
  const move = historyHeap.pop()!
  if (move) {
    const preKey = move[0].key
    const prePos = move[0].pos
    const currentKey = move[1].key
    const currentPos = move[1].pos
    const { chessTypeMap, chessRefMap } = ChessBoardMap
    chessTypeMap[prePos.top][prePos.left] = preKey
    chessTypeMap[currentPos.top][currentPos.left] = currentKey

    const preChessRef = chessRefMap[prePos.top][prePos.left]
    const currentChessRef = chessRefMap[currentPos.top][currentPos.left]
    const chessRestoreRef = currentChessRef.pop()!
    preChessRef.push(chessRestoreRef)
    // chess move
    chessRestoreRef.top = prePos.top
    chessRestoreRef.left = prePos.left

    // show the died chess
    if (currentKey)
      currentChessRef[currentChessRef.length - 1].isDied = false

    // change ChessActivingState
    ChessActivingState.value = preKey & ChessTypeEnum.colorMask

    // chessBox move
    const chessBoxMove = historyHeap[historyHeap.length - 1]
    if (historyHeap.length) {
      const preKey = chessBoxMove[0].key
      const prePos = chessBoxMove[0].pos
      const currentPos = chessBoxMove[1].pos
      const chessBoxColor = preKey & ChessTypeEnum.colorMask
      const preChessBox = ChessBoxStateMap[ChessBoxStateEnum.previousState | chessBoxColor]
      const currentChessBox = ChessBoxStateMap[ChessBoxStateEnum.currentState | chessBoxColor]
      preChessBox.top = prePos.top
      preChessBox.left = prePos.left
      currentChessBox.top = currentPos.top
      currentChessBox.left = currentPos.left
    }
    else {
      // let another chessbox disappear
      const colorState = ChessActivingState.value & ChessTypeEnum.colorMask ^ ChessTypeEnum.colorMask
      const preChessBox = ChessBoxStateMap[ChessBoxStateEnum.previousState | colorState]
      const currentChessBox = ChessBoxStateMap[ChessBoxStateEnum.currentState | colorState]
      const initVal = -1
      preChessBox.top = initVal
      preChessBox.left = initVal
      currentChessBox.top = initVal
      currentChessBox.left = initVal
    }
  }
  // console.log(historyHeap, '====')
}

export const chessMove = (originPostion: Position, currentPostion: Position) => {
  const { chessRefMap, chessTypeMap } = ChessBoardMap

  // change chess type
  const preChessType = chessTypeMap[originPostion.top][originPostion.left]
  const currentChessType = chessTypeMap[currentPostion.top][currentPostion.left]
  chessTypeMap[currentPostion.top][currentPostion.left] = preChessType
  chessTypeMap[originPostion.top][originPostion.left] = 0

  // exchange chess ref
  // debugger
  const preChessRef = chessRefMap[originPostion.top][originPostion.left]
  const currentChessRef = chessRefMap[currentPostion.top][currentPostion.left]
  const chessToKilledRef = currentChessRef[currentChessRef.length - 1]
  const activingChess = preChessRef.pop()!
  currentChessRef.push(activingChess)
  activingChess.top = currentPostion.top
  activingChess.left = currentPostion.left

  if (currentChessType)
    chessToKilledRef.isDied = true

  // recordHistory
  recordHistory({ key: preChessType, pos: originPostion }, { key: currentChessType, pos: currentPostion })

  // change chess box
  // debugger
  const activingChessBoxColor = preChessType & ChessBoxStateEnum.colorMask
  const preChessBox = ChessBoxStateMap[activingChessBoxColor | ChessBoxStateEnum.previousState]
  const currentChessBox = ChessBoxStateMap[activingChessBoxColor | ChessBoxStateEnum.currentState]
  preChessBox.top = originPostion.top
  preChessBox.left = originPostion.left
  currentChessBox.top = currentPostion.top
  currentChessBox.left = currentPostion.left

  ChessActivingState.value = activingChessBoxColor ^ ChessBoxStateEnum.colorMask

  return currentChessType & ChessTypeEnum.j
}
