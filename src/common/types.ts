import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export enum ChessTypeEnum {
  red = 1,
  black=1 << 1,
  colorMask = red | black,
  b =1 << 2,
  c=1 << 3,
  m=1 << 4,
  p=1 << 5,
  x=1 << 6,
  s=1 << 7,
  j=1 << 8,
  selected = 1 << 9,
}

export enum ChessBoxStateEnum{
  red = 1,
  black = 1 << 1,
  colorMask = red | black,
  currentState = 1 << 2,
  previousState = 1 << 3
}

export type RefType = {
  left: number
  top: number
  isDied: boolean
}

export type ChessTypeMap = number[][]
export type ChessRefMap = Array<Array<Array< RefType & {isDied: boolean}>>>

export type ChessBoardMapType = {
  chessTypeMap: ChessTypeMap
  chessRefMap: ChessRefMap
}

export type Position ={
  top: number
  left: number
}

export type MoveType = {
  originPostion: Position
  currentPostion: Position
}

export type ChessMapType ={
  [x: number]: {
    url: string
    position: Position[]
    getAllMovePosition: (props: {
      top: number
      left: number
      chessType: number
      ChessBoardMap: ChessTypeMap
    }) => number[][]
    valueMap: number[][]
  }
}

export enum RegretType {
  init,
  request,
  agree,
  disagree
}

export enum RestartType {
  init,
  request,
  agree,
  disagree
}

export type RecieverType = Partial<{
  clientID: number
  opponentID: number
  roomID: number
  preTop: number
  preLeft: number
  currentTop: number
  currentLeft: number
  msg: string
  isPlayFirst: boolean
  canStart: boolean
  opponentQuit: boolean
  talk: string
  canOpponentRegret: RegretType
  canRestart: RestartType
}>

export enum PlayMode{
  waitingStart,
  playWithComputer,
  playOnline
}

export enum MsgType{
  system,
  yours,
  opponent
}
