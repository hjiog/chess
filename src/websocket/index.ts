import { RecieverType } from '~/common'

const url = 'wss://service-qgnrlvfs-1300852544.gz.apigw.tencentcs.com/release'
// const url = 'ws://localhost:8085/getData'

let ws: WebSocket

let _message: RecieverType = {}

export const connectWebsocket = (cb: (msg: RecieverType) => void) => {
  if (ws)
    return

  ws = new WebSocket(url)
  ws.onopen = () => {
    console.log('Connection open ...')
    ws.send('')
  }

  ws.onmessage = (e) => {
    try {
      const res = JSON.parse(e.data) as RecieverType
      console.log('Received RecieverType: ', res)
      _message = {
        ...res,
        currentLeft: 0,
        currentTop: 0,
        preLeft: 0,
        preTop: 0,
        canOpponentRegret: 0,
        canRestart: 0,
        msg: '',
        talk: '',
      }
      cb?.(res)
    }
    catch (e) {
      console.log(e)
    }
  }

  ws.onclose = function() {
    console.log('Connection closed.')
  }

  ws.onerror = (e) => {
    console.error(e)
  }
}

export const sendMessage = (message: RecieverType) => {
  const sendMsg = JSON.stringify({ ..._message, ...message })
  // sendMsg = sendMsg.replace(/\"/g, '\\"')
  ws.send(sendMsg) // 复杂的数据结构要先进行序列化
}
