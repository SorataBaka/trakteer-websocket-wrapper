import { EventEmitter } from "stream";

export interface ClientParameter {
  mainChannelID: string
  testChannelID: string
}
export interface WebsocketEvent {
  event: string
  data ? : string
  channel ? : string
}
export interface Donation {
  tip_id: string
  supporter_name: string
  unit: string
  quantity: string
  supporter_message: string
  supporter_avatar: string
  unit_icon: string
  price: string
  id: string
  type: string
}
export interface TrakteerSocket extends EventEmitter {
  TrakteerSocket:WebSocket
  PingIntervalTime:number
  PingInterval:ReturnType<typeof setInterval>
  mainChannelID:string
  testChannelID:string
  close():void
  interval():ReturnType<typeof setInterval>
}