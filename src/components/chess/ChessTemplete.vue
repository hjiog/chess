
<template>
  <img
    v-if="canShow"
    :src="url"
    class="cursor-pointer z-index-3 absolute"
    :style="reactiveStyle"
    @click="onClick"
    @mouseover="onMouseover"
    @mouseleave="onMouseleave"
  />
</template>

<script setup lang='ts'>
import { defineProps, ref, computed, reactive } from 'vue'
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
const realWidth = ref(unitWidth)

const props = defineProps({
  top: Number,
  left: Number,
  url: Object,
  type: Number,
  getAllMovePosition: Function,
})

// Record<string, { [key: string]: any; }>

const chessRef = reactive({
  top: props.top!,
  left: props.left!,
  isDied: false,
})

const { chessRefMap } = ChessBoardMap

chessRefMap[props.top!][props.left!] = [chessRef]

const reactiveStyle = computed(() => {
  return {
    top: `${chessRef.top * unitWidth}px`,
    left: `${chessRef.left * unitWidth}px`,
    width: `${realWidth.value}px`,
  }
})

let url = ''

Object.keys(props.url!).forEach((key1) => {
  Object.keys(props.url![key1]).forEach((key2) => {
    url = props.url![key1][key2]
  })
})

const canShow = computed(() => {
  return props.top! >= 0
    && props.left! >= 0
    && !chessRef.isDied
})

const move = (position: { top: number; left: number; type: number }) => {
  const movePointArray = props.getAllMovePosition!(
    {
      top: chessRef.top,
      left: chessRef.left,
      chessType: position.type,
      ChessBoardMap: ChessBoardMap.chessTypeMap,
    })

  const findIndex = movePointArray.findIndex((val: any) => {
    return val[0] === position.top && val[1] === position.left
  })

  if (findIndex > -1) {
    const isWin = chessMove({ top: chessRef.top, left: chessRef.left }, { top: position.top, left: position.left })
    if (isWin) {
      message.success({
        message: '你赢了>=<',
      })
    }
    return true
  }
  return false
}

const onClick = (e: any) => {
  const canClick = Store.isPlayFirst ? (ChessActivingState.value & ChessTypeEnum.red) : (ChessActivingState.value & ChessTypeEnum.black)
  if (!canClick)
    return

  const top = Math.round(e.target.offsetTop / unitWidth)
  const left = Math.round(e.target.offsetLeft / unitWidth)
  const { currentChessState, previousChessState } = getChessBoxState.value

  const isSameCamp = props.type! & ChessActivingState.value & (ChessTypeEnum.red | ChessTypeEnum.black)

  if (isSameCamp) {
    currentChessState.top = top
    currentChessState.left = left
    ChessActivingState.value = props.type! | ChessTypeEnum.selected
    ChessMoveCallback.call = move
  }
  else {
    if (ChessActivingState.value & ChessTypeEnum.selected) {
      if (ChessMoveCallback.call({ top, left, type: ChessActivingState.value })) {
        if (Store.canStart.value === PlayMode.playWithComputer) {
          console.log('worker.postMessage: ', ChessBoardMap.chessTypeMap)
          worker.postMessage({ ChessBoardMap: ChessBoardMap.chessTypeMap, isPlayFirst: Store.isPlayFirst })
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
}

const onMouseover = () => {
  realWidth.value = unitWidth + 10
}

const onMouseleave = () => {
  realWidth.value = unitWidth
}
</script>
