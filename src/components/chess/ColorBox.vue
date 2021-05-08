
<template>
  <img
    v-if="canShow"
    :src="url"
    alt=""
    class="cursor-pointer z-index-1 absolute"
    :style="reactiveStyle"
  >
</template>

<script setup lang='ts'>
import { defineProps,  computed } from 'vue'
import {
  useLayout,
  ChessBoxStateMap,
  ColorBoxUrlMap,
  ChessActivingState,
  ChessTypeEnum,
  ChessBoxStateEnum,
} from '~/common'
const { unitWidth } = useLayout()

const props = defineProps({
  type: Number,
})

const reactiveStyle = computed(() => {
  return {
    top: `${ChessBoxStateMap[props.type!].top! * unitWidth}px`,
    left: `${ChessBoxStateMap[props.type!].left! * unitWidth}px`,
    width: `${unitWidth}px`,
  }
})


const canShow = computed(() => {
  const sameColor = ChessActivingState.value & props.type!
  const selected = ChessActivingState.value & ChessTypeEnum.selected
  const isCurrent = props.type! & ChessBoxStateEnum.currentState

  const canCurrentBoxShow = (sameColor && selected && isCurrent) || (!sameColor && isCurrent)
  const canPreBoxShow = !sameColor && !isCurrent
  // debugger
  return  ChessBoxStateMap[props.type!].top >= 0
  && ChessBoxStateMap[props.type!].left >= 0
  && (canCurrentBoxShow || canPreBoxShow)
})

const colorType = Object.keys(ColorBoxUrlMap).find((key) => {
  if (Number(key) & props.type!)
    return true
  return false
})

let url = ''
const propsUrl = ColorBoxUrlMap[Number(colorType!)]
Object.keys(propsUrl).forEach(key1 => {
  Object.keys(propsUrl[key1]).forEach(key2 => {
    url = propsUrl[key1][key2]
  })
})

</script>
