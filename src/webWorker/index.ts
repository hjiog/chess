
import { alphaBetaSearch } from './computeTask'
import { Store, MoveType } from '~/common'
import { MATE_VALUE, MINMAXDEPTH } from '~/webWorker/const'

const ctx: Worker = self as any
ctx.addEventListener('message', (e) => {
  console.log('ai start,recieve data:', e.data)
  // 注意,在webWork引入的Store是一份拷贝,在主程序执行Store.isPlayFirst = true
  // 并不会影响到这里的Store,因此这里还需操作一次
  Store.isPlayFirst = e.data.isPlayFirst

  const searchResult: MoveType = {
    originPostion: {
      top: 0,
      left: 0,
    },
    currentPostion: {
      top: 0,
      left: 0,
    },
  }

  const value = alphaBetaSearch({
    valAlpha: -MATE_VALUE,
    valBeta: MATE_VALUE,
    depth: MINMAXDEPTH,
    chessboardMap: e.data.ChessBoardMap,
    searchResult,
  })

  console.log(searchResult, 'value:', value)
  ctx.postMessage(searchResult)
})
