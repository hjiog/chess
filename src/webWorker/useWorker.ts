// 在生产构建中将会分离出 chunk
import { message } from 'ant-design-vue'
import Worker from './index?worker'
import { MoveType, chessMove } from '~/common'
export const worker = new Worker()

worker.onmessage = (e: { data: any }) => {
  const result = e.data
  console.log('AI search result============', result)

  const { originPostion, currentPostion } = result as MoveType
  if (originPostion.top === currentPostion.top && originPostion.left === currentPostion.left) {
    message.success({
      message: '绝杀!!! 恭喜你赢得本次对局',
    })
    return
  }
  const isLosed = chessMove(originPostion, currentPostion)
  if (isLosed) {
    message.info({
      message: '你输了>=<',
    })
  }
}

worker.addEventListener('error', console.error)
