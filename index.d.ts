interface ClientParameter {
  widgetURL: string
  mainChannelID: string
  testChannelID: string
}
interface WebsocketEvent {
  event: string
  data ? : string
  channel ? : string
}
interface Donation {
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