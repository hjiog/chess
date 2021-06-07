import * as zrender from 'zrender'
import { watchEffect } from 'vue'

import {
  useLayout,
  ChessBoxStateMap,
  ColorBoxUrlMap,
  ChessActivingState,
  ChessTypeEnum,
  ChessBoxStateEnum,
} from '~/common'

const { unitWidth } = useLayout()

const addWatchEffect = (taget: zrender.Image, type: ChessBoxStateEnum) => {
  watchEffect(() => {
    taget.setStyle({
      x: ChessBoxStateMap[type].left * unitWidth,
      y: ChessBoxStateMap[type].top * unitWidth,
    })
  })

  watchEffect(() => {
    const sameColor = ChessActivingState.value & type!
    const selected = ChessActivingState.value & ChessTypeEnum.selected
    const isCurrent = type! & ChessBoxStateEnum.currentState

    const canCurrentBoxShow = (sameColor && selected && isCurrent) || (!sameColor && isCurrent)
    const canPreBoxShow = !sameColor && !isCurrent

    const canShow = canCurrentBoxShow || canPreBoxShow

    if (canShow)
      taget.show()
    else taget.hide()
  })
}

export const genereteChessBox = (type: ChessBoxStateEnum) => {
  const colorType = Object.keys(ColorBoxUrlMap).find((key) => {
    if (Number(key) & type)
      return true
    return false
  })

  const target = new zrender.Image({
    style: {
      image: ColorBoxUrlMap[Number(colorType!)],
      height: unitWidth || 0,
    },
  })
  target.hide()
  addWatchEffect(target, type)
  return target
}
