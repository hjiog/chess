<template>
  <div id="zr" :style="style">
  </div>
</template>

<script setup lang='ts'>
import { onMounted, defineProps, watch, toRefs } from 'vue'
import * as zrender from 'zrender'
import CanvasPainter from 'zrender/lib/canvas/Painter'

import {
  useLayout,
  imgUrl_chessBoard,
  ChessActivingState,
  ChessBoardMap,
  ChessMoveCallback,
  getChessBoxState,
  Store,
  ChessBoxStateEnum,
  ChessTypeEnum,
  PlayMode,
} from '~/common'
import { genereteChess } from '~/common/chess'
import { genereteChessBox } from '~/common/chessBox'
import type { ChessMapType } from '~/common/types'
import { sendMessage } from '~/websocket'
import { worker } from '~/webWorker/useWorker'

const props = defineProps<{realChessMap: ChessMapType}>()
const { realChessMap } = toRefs(props)

const { chessboardHeight, unitWidth } = useLayout()
const style = {
  height: `${chessboardHeight}px`,
}
const canStart = Store.canStart

const chessArr: ({
  instance: zrender.Image
  effect: (top: number, left: number) => void
})[] = []

onMounted(() => {
  const container = document.getElementById('zr')

  // 运行vite build时，不知道为啥会将zrender/index.js中的registerPainter函数给删掉
  // 没想到什么好的解决方法，这里暂时给补上~
  zrender.registerPainter('canvas', CanvasPainter as any)
  const zr = zrender.init(container!,{renderer:'canvas'})
  const Chessboard = new zrender.Image({
    style: {
      image: imgUrl_chessBoard,
      height: chessboardHeight || 0,
    },
  })

  zr.on('click', (e) => {
    const top = Math.floor(e.offsetY / unitWidth)
    const left = Math.floor(e.offsetX / unitWidth)
    if (ChessTypeEnum.selected & ChessActivingState.value) {
      const { previousChessState } = getChessBoxState.value
      if (ChessMoveCallback.call({ top, left, type: ChessActivingState.value })) {
        if (canStart.value === PlayMode.playWithComputer) {
          worker.postMessage({ ChessBoardMap: ChessBoardMap.chessTypeMap, isPlayFirst: Store.isPlayFirst })
        }
        else if (canStart.value === PlayMode.playOnline) {
          sendMessage({
            currentTop: top,
            currentLeft: left,
            preTop: previousChessState.top,
            preLeft: previousChessState.left,
          })
        }
      }
    }
  })

  // 添加棋盘
  zr.add(Chessboard)

  // 添加棋子标记
  const chessStateArray = [
    ChessBoxStateEnum.red | ChessBoxStateEnum.currentState,
    ChessBoxStateEnum.red | ChessBoxStateEnum.previousState,
    ChessBoxStateEnum.black | ChessBoxStateEnum.currentState,
    ChessBoxStateEnum.black | ChessBoxStateEnum.previousState,
  ]

  chessStateArray.forEach((type) => {
    const chessBox = genereteChessBox(type)
    zr.add(chessBox)
  })

  const addChess = (chessMap: ChessMapType) => {
    chessArr.forEach((arr) => {
      zr.remove(arr.instance)
    })
    chessArr.length = 0
    Object.keys(chessMap).map(v => Number(v)).forEach((val) => {
      chessMap[val].position.forEach((pos) => {
        const { top, left } = pos
        const { target, storeEffect } = genereteChess({
          top,
          left,
          url: chessMap[val].url,
          getAllMovePosition: chessMap[val].getAllMovePosition,
          type: val,
        })
        chessArr.push({
          instance: target,
          effect: storeEffect,
        })
        zr.add(target)
      })
    })
  }

  // 添加棋子
  // addChess(realChessMap.value)

  // 重新赋值依赖
  watch(
    realChessMap,
    (chessMap) => {
      addChess(chessMap)
    },
  )
})

</script>
