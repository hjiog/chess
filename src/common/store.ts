import { reactive, ref } from 'vue'
import { ChessBoxStateEnum, ChessTypeEnum, PlayMode } from '~/common/types'

export const ChessBoxStateMap = {
  [ChessBoxStateEnum.red | ChessBoxStateEnum.currentState]: reactive({
    top: -1,
    left: -1,
  }),
  [ChessBoxStateEnum.red | ChessBoxStateEnum.previousState]: reactive({
    top: -1,
    left: -1,
  }),
  [ChessBoxStateEnum.black | ChessBoxStateEnum.currentState]: reactive({
    top: -1,
    left: -1,
  }),
  [ChessBoxStateEnum.black | ChessBoxStateEnum.previousState]: reactive({
    top: -1,
    left: -1,
  }),
}

export const ChessActivingState = ref<ChessTypeEnum>(ChessTypeEnum.red)

type callbackFunctionType ={call: (props: { top: number; left: number; type: number}) => boolean}
// todo 加上call属性是因为不能直接修改ChessMoveCallback
export const ChessMoveCallback: callbackFunctionType = {
  call: () => false,
}

export const Store = {
  isPlayFirst: true,
  canStart: ref<PlayMode>(PlayMode.waitingStart),
}
