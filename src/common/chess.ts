import { Image } from 'zrender'
import { reactive, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import {
  useLayout,
  ChessTypeEnum,
  getChessBoxState,
  ChessActivingState,
  ChessMoveCallback,
  ChessBoardMap,
  Store,
  PlayMode,
  chessMove,
} from '~/common'
import { sendMessage } from '~/websocket'
import { worker } from '~/webWorker/useWorker'

const { unitWidth } = useLayout()

type propsType = {
  top: number
  left: number
  url: string
  type: number
  getAllMovePosition: any
}

type moveCallBack = (position: {
  top: number
  left: number
  type: number
}) => boolean

let _props: propsType

const addListener = (target: Image, moveCallBack: moveCallBack) => {
  const { type } = _props

  target.on('mouseover', () => {
    target.setStyle({
      height: unitWidth + 10 || 0,
    })
  })

  target.on('mouseout', () => {
    target.setStyle({
      height: unitWidth || 0,
    })
  })

  target.on('click', (e) => {
    e.cancelBubble = true
    const canClick = Store.isPlayFirst
      ? ChessActivingState.value & ChessTypeEnum.red
      : ChessActivingState.value & ChessTypeEnum.black
    if (!canClick) return
    const top = Math.floor(e.offsetY / unitWidth)
    const left = Math.floor(e.offsetX / unitWidth)
    const { currentChessState, previousChessState } = getChessBoxState.value

    const isSameCamp
      = type!
      & ChessActivingState.value
      & (ChessTypeEnum.red | ChessTypeEnum.black)

    if (isSameCamp) {
      currentChessState.top = top
      currentChessState.left = left
      ChessActivingState.value = type! | ChessTypeEnum.selected
      ChessMoveCallback.call = moveCallBack
    }
    else {
      if (ChessActivingState.value & ChessTypeEnum.selected) {
        if (
          ChessMoveCallback.call({
            top,
            left,
            type: ChessActivingState.value,
          })
        ) {
          if (Store.canStart.value === PlayMode.playWithComputer) {
            // eslint-disable-next-line no-console
            console.log('worker.postMessage: ', ChessBoardMap.chessTypeMap)
            worker.postMessage({
              ChessBoardMap: ChessBoardMap.chessTypeMap,
              isPlayFirst: Store.isPlayFirst,
            })
          }
          else {
            sendMessage({
              preLeft: previousChessState.left,
              preTop: previousChessState.top,
              currentTop: top,
              currentLeft: left,
            })
          }
        }
      }
    }
  })
}

const addWatchEffect = (target: Image, chessRef: {
  top: number
  left: number
  isDied: boolean
}) => {
  watchEffect(() => {
    target.setStyle({
      x: chessRef.left * unitWidth,
      y: chessRef.top * unitWidth,
    })
  })

  watchEffect(() => {
    if (!chessRef.isDied)
      target.show()
    else target.hide()
  })
}

export const genereteChess = (props: propsType) => {
  _props = { ...props }
  const { top, left, url, getAllMovePosition } = props
  const target = new Image({
    style: {
      image: url,
      height: unitWidth || 0,
    },
  })

  const chessRef = reactive({
    top: top!,
    left: left!,
    isDied: false,
  })

  const move = (position: { top: number; left: number; type: number }) => {
    const movePointArray = getAllMovePosition!({
      top: chessRef.top,
      left: chessRef.left,
      chessType: position.type,
      ChessBoardMap: ChessBoardMap.chessTypeMap,
    })

    const findIndex = movePointArray.findIndex((val: any) => {
      return val[0] === position.top && val[1] === position.left
    })

    if (findIndex > -1) {
      const isWin = chessMove(
        { top: chessRef.top, left: chessRef.left },
        { top: position.top, left: position.left },
      )
      if (isWin)
        message.success('你赢了>=<')

      return true
    }
    return false
  }

  const storeEffect = (top: number, left: number) => {
    const { chessRefMap } = ChessBoardMap
    chessRefMap[top][left] = [chessRef]
  }

  storeEffect(chessRef.top, chessRef.left)
  addListener(target, move)
  addWatchEffect(target, chessRef)

  return {
    target,
    storeEffect,
  }
}
