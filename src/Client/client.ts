import WebSocket from "ws";
import EventEmitter from "events"
/**
 * Initiate a Trakteer Websocket Wrapper Client
 * @param widgetURL
 * @param socketURL
 */
class TrakteerSocket extends EventEmitter{
  public TrakteerToken:string
  public TrakteerSocket:WebSocket
  public PingIntervalTime:number = 25000
  public PingInterval:any
  constructor(PARAMETER:ClientParameter){
    super()
    //Initiate required tokens and strings
    this.TrakteerToken = PARAMETER.widgetURL.split("stream?key=")[1]
    if(this.TrakteerToken === undefined){
      throw "Widget URL invalid"
    }


    //Handle websocket connections
    this.TrakteerSocket = new WebSocket("wss://socket.trakteer.id/app/2ae25d102cc6cd41100a")
    if(!this.TrakteerSocket){
      throw "Socket URL Invalid"
    }
    this.TrakteerSocket.on('message', (data:Buffer) => {
      const eventObject:WebsocketEvent = JSON.parse(data.toString())
      //Handle connection to Trakteer WebSocket
      if(eventObject.event == "pusher:connection_established"){
        this.emit('connected', {
          event: 'connected',
          data: eventObject
        })
        this.TrakteerSocket.send(JSON.stringify({
          event: "pusher:subscribe",
          data:{
            auth: "",
            channel: PARAMETER.mainChannelID
          }
        }))
        this.TrakteerSocket.send(JSON.stringify({
          event: "pusher:subscribe",
          data: {
            auth: "",
            channel: PARAMETER.testChannelID
          }
        }))
        this.PingInterval = setInterval(()=>{
          this.TrakteerSocket.send(JSON.stringify({
            event: "pusher:ping",
            data: {}
          }))
        }, this.PingIntervalTime)
      }
      if(eventObject.event == "pusher_internal:subscription_succeeded"){
        this.emit("subscribed", {
          event: "subscribed",
          data: eventObject
        })
      }
      if(eventObject.event == "pusher:pong"){
        this.emit("pong", {
          event: "pong",
          data: eventObject
        })
      }
      if(eventObject.event == "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated"){
        const donationData:Donation = JSON.parse(eventObject.data as string)
        this.emit('donation', {
          event: "donation",
          data: donationData
        })
      } 
    })
    this.TrakteerSocket.on('close', (data) => {
      this.emit('close', {
        event: "close",
        data: data
      })
    })
  }
  close = () => {
    clearInterval(this.PingInterval)
    this.TrakteerSocket.close()
  }
}
export default TrakteerSocket