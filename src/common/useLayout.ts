// todo 不明白为啥webWorker用调用这里,window为undefined报错
const chessboardHeight = typeof window !== 'undefined' && window.innerHeight - 20

export function useLayout() {
  return {
    unitWidth: (chessboardHeight || 1) / 10,
    chessboardHeight,
  }
}
