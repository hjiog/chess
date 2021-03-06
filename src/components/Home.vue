<template>
  <a-modal
    v-model:visible="modalVisible"
    title="请输入房间号"
    cancel-text="取消"
    ok-text="确定"
    :width="320"
    @ok="handleOk"
  >
    <div class="text-center">
      <a-input-number v-model:value="roomNumber" :min="1" />
    </div>
  </a-modal>
  <div class="container flex flex-row px-5 items-center justify-start">
    <div class="w-1/2 relative" :style="style">
      <ChessBoard :real-chess-map="realChessMap" />
    </div>

    <div class="flex flex-row ml-8 items-center justify-between">
      <div class="w-23">
        <a-popover v-model:visible="hasConfirmPlayer" placement="top" trigger="click">
          <template #content>
            <a-button type="primary" class="mx-2 inline" @click="onStart(true)">
              先手
            </a-button>
            <a-button type="primary" class="mx-2 inline" @click="onStart(false)">
              后手
            </a-button>
          </template>
          <a-button
            type="primary"
            class="my-2 w-22"
          >
            {{ canStart === PlayMode.playWithComputer ? '重新开始' : '单人对战' }}
          </a-button>
        </a-popover>

        <a-button type="primary" class="my-2" :loading="isRequestRestart" @click="onStartOnline">
          <template v-if="canStart === PlayMode.playOnline">
            重新开始
          </template>
          <template v-else>
            双人对战
          </template>
        </a-button>

        <a-button v-if="!canRegret" type="primary" class="my-2 w-22" disabled>
          悔棋
        </a-button>

        <a-popover
          v-if="canRegret"
          v-model:visible="hasConfirmRegret"
          placement="bottom"
          trigger="click"
        >
          <template #content>
            <div>
              <div>是否悔棋?</div>
              <div class="mt-3 text-center">
                <a-button type="primary" class="mr-2 inline" @click="onRegret">
                  是
                </a-button>
                <a-button type="primary" class="inline" @click="hasConfirmRegret = false">
                  否
                </a-button>
              </div>
            </div>
          </template>
          <a-button class="my-2 w-22" type="primary" :loading="isRequestRegreting">
            悔棋
          </a-button>
        </a-popover>

        <!-- <a-button type="primary" class="my-2 w-22" @click="test">
          残局调试
        </a-button> -->
      </div>

      <div v-if="msgArray.length" class="flex flex-col ml-16 w-100">
        <a-typography-title :level="5">
          消息列表
        </a-typography-title>
        <div class="bg-gray-100 h-80 overflow-auto">
          <a-comment v-for="item in msgArray" :key="item" class="-mb-4">
            <template #author>
              <span v-if="item.type === MsgType.system">系统</span>
              <span v-if="item.type === MsgType.yours" class>你</span>
              <span v-if="item.type === MsgType.opponent">对手</span>
            </template>
            <template #content>
              <div class="text-left">
                <span v-if="item.type === MsgType.system">{{ item.msg }}</span>
                <span v-if="item.type === MsgType.yours" class="text-blue-600">{{ item.msg }}</span>
                <span v-if="item.type === MsgType.opponent" class="text-red-600">{{ item.msg }}</span>
              </div>
            </template>
            <template #datetime>
              {{ item.time }}
            </template>
          </a-comment>
        </div>
        <div class="flex flex-row mt-2">
          <a-input v-model:value="msgToSend" placeholder="请输入聊天内容"></a-input>
          <a-button
            type="primary"
            class="ml-4 w-18"
            :disabled="!msgToSend || canStart !== PlayMode.playOnline"
            @click="onSendMsg"
          >
            发送
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { message, Modal } from 'ant-design-vue'
import { worker } from '~/webWorker/useWorker'
import { connectWebsocket, sendMessage } from '~/websocket'
// 解决'RecieverType' only refers to a type, but is being used as a value here
import type { RecieverType } from '~/common'

import {
  useLayout,
  ChessMap,
  ChessActivingState,
  ChessTypeEnum,
  ChessBoardMap,
  Store,
  initStatus,
  restoreHistory,
  PlayMode,
  MsgType,
  chessMove,
  RegretType,
  RestartType,
  getHistoryLength,
} from '~/common'

const { chessboardHeight, unitWidth } = useLayout()

const style = {
  height: `${chessboardHeight}px`,
  width: `${unitWidth * 10}px`,
}

const hasConfirmPlayer = ref(false)
const hasConfirmRegret = ref(false)
const modalVisible = ref(false)
const canStart = Store.canStart
const realChessMap = ref(ChessMap)
const msgArray = reactive<{ type: MsgType; msg: string; time: string }[]>([])
const roomNumber = ref('')
const msgToSend = ref('')
const isRequestRegreting = ref(false)
const isRequestRestart = ref(false)

const canRegret = computed(() => {
  if (getHistoryLength()) {
    if (canStart.value === PlayMode.playOnline) {
      return Store.isPlayFirst
        ? ChessActivingState.value & ChessTypeEnum.black
        : ChessActivingState.value & ChessTypeEnum.red
    }
    if (canStart.value === PlayMode.playWithComputer)
      return true
  }
  return false
})

const getCurrentTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

const onStart = (isPlayFirst: boolean) => {
  canStart.value = PlayMode.waitingStart
  msgArray.length = 0
  setTimeout(() => {
    realChessMap.value = initStatus(isPlayFirst)
    if (!isPlayFirst)
      worker.postMessage({ ChessBoardMap: ChessBoardMap.chessTypeMap, isPlayFirst: Store.isPlayFirst })
    canStart.value = PlayMode.playWithComputer
    hasConfirmPlayer.value = false
  })
}

const recieveMsgCallBack = (reciever: RecieverType) => {
  const { currentTop, currentLeft, preLeft, preTop } = reciever
  if (currentTop !== -1) {
    const isLosed = chessMove({ top: 9 - preTop!, left: 8 - preLeft! }, { top: 9 - currentTop!, left: 8 - currentLeft! })
    if (isLosed)
      message.info('你输了>=<')
  }
  else if (reciever.talk) { msgArray.unshift({ msg: reciever.talk, type: MsgType.opponent, time: getCurrentTime() }) }
  else if (reciever.canOpponentRegret === RegretType.request) {
    Modal.confirm({
      title: '提示',
      content: '对手请求悔棋,是否同意?',
      maskClosable: false,
      closable: false,
      okText: '同意',
      cancelText: '拒绝',
      onOk: () => {
        sendMessage({
          canOpponentRegret: RegretType.agree,
        })
        restoreHistory()
      },
      onCancel: () => {
        sendMessage({
          canOpponentRegret: RegretType.disagree,
        })
      },
    })
  }
  else if (reciever.canOpponentRegret === RegretType.agree) {
    isRequestRegreting.value = false
    restoreHistory()
  }
  else if (reciever.canRestart === RestartType.request) {
    Modal.confirm({
      title: '提示',
      content: '对手请求重开,是否同意?',
      maskClosable: false,
      closable: false,
      okText: '同意',
      cancelText: '拒绝',
      onOk: () => {
        sendMessage({
          canRestart: RestartType.agree,
        })
        canStart.value = PlayMode.waitingStart
        setTimeout(() => {
          Store.isPlayFirst = reciever.isPlayFirst!
          realChessMap.value = initStatus(reciever.isPlayFirst!)
          canStart.value = PlayMode.playOnline
        })
      },
      onCancel: () => {
        sendMessage({
          canRestart: RestartType.disagree,
        })
      },
    })
  }
  else if (reciever.canRestart === RestartType.agree) {
    isRequestRestart.value = false
    canStart.value = PlayMode.waitingStart
  }
  else {
    if (reciever.canRestart === RestartType.disagree)
      isRequestRestart.value = false
    else if (reciever.canOpponentRegret === RegretType.disagree)
      isRequestRegreting.value = false

    msgArray.unshift({ msg: reciever.msg!, type: MsgType.system, time: getCurrentTime() })
  }

  // 更新棋盘
  if (reciever.canStart && canStart.value !== PlayMode.playOnline) {
    setTimeout(() => {
      Store.isPlayFirst = reciever.isPlayFirst!
      realChessMap.value = initStatus(reciever.isPlayFirst!)
      canStart.value = PlayMode.playOnline
    })
  }
}

const handleOk = () => {
  if (roomNumber.value) {
    sendMessage({
      roomID: Number(roomNumber.value),
    })
    modalVisible.value = false
  }
}

const onStartOnline = () => {
  if (canStart.value !== PlayMode.playOnline) {
    connectWebsocket(recieveMsgCallBack)
    modalVisible.value = true
  }
  else {
    isRequestRestart.value = true
    sendMessage({
      canRestart: RestartType.request,
    })
  }
}

const onSendMsg = () => {
  msgArray.unshift({
    type: MsgType.yours,
    msg: msgToSend.value,
    time: getCurrentTime(),
  })
  sendMessage({ talk: msgToSend.value })
  msgToSend.value = ''
}

const onRegret = () => {
  hasConfirmRegret.value = false

  if (canStart.value === PlayMode.playOnline) {
    sendMessage({
      canOpponentRegret: RegretType.request,
    })
    isRequestRegreting.value = true
  }
  else if (canRegret.value) {
    restoreHistory()
    restoreHistory()
  }
}

// const test = () => {
//   const chessBoard = [
//     [0, 0, 66, 0, 258, 130, 0, 0, 0],
//     [0, 0, 0, 0, 130, 0, 0, 0, 0],
//     [0, 0, 0, 0, 66, 0, 0, 0, 0],
//     [6, 0, 0, 0, 0, 0, 0, 0, 6],
//     [0, 0, 9, 0, 33, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 9, 0, 0],
//     [0, 0, 5, 0, 34, 0, 0, 0, 5],
//     [17, 0, 0, 0, 0, 10, 0, 0, 0],
//     [0, 0, 0, 0, 257, 0, 0, 0, 0],
//     [0, 0, 65, 129, 0, 129, 65, 0, 0],
//   ]
//   worker.postMessage({ ChessBoardMap: chessBoard, isPlayFirst: Store.isPlayFirst })
// }
</script>
