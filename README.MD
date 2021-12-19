# Trakteer Websocket Wrapper
Simple websocket wrappper for trakteer. This module requires both creator-stream channels id to be provided in order to be able to connect to the servers and receive data. <br>
```Javascript
const TrakteerSocket = require("trakteer-websocket-wrapper")
const client = new TrakteerSocket({
    mainChannelID: "creator-stream.a6z7asdfadn4mlqy.trstream-asdfadfasdfasfqT",
    testChanneLID: "creator-stream-test.a6sadfeafzn4mlqy.trstream-asdfadfasdfasfqT"
})
//Emitted when client receive donations in trakteer
client.on("donation", (data)=>{
    console.log(data)
})
//Emitted when the client successfully connected to Trakteer Websocket
client.on("connected", (data)=>{
    console.log(data)
})
//Emitted when the client successfully subscribed to the channels
client.on("subscribed", (data)=>{
    console.log(data)
})
//Emitted when server responded to the client ping
client.on("pong", (data)=>{
    console.log(data)
})
//Emitted when client failed to subscribe to the channels
client.on("subscription_error", (data)=>{
    console.log(data)
})
//Emitted on websocket error
client.on("error", (data)=>{
    console.log(data)
})
//Emitted on websocket connection close
client.on("close", (data)=>{
    console.log(data)
})
```
<h2>Installation</h2> <br>
`npm install trakteer-websocket-wrapper` <br>

<h2>Usage</h2> <br>
Go to the trakteer dashboard
Click on "Stream Overlay"
Click on "Open URL"
Go to Inspect Elements
Click on Network
Click On "WS"
Click On "Messages"
Refresh the page
Find ```{"event":"pusher:subscribe","data":{"auth":"","channel":"creator-stream-test.asadfasdfalqy.trstream-asdfadfasdfasfa"}}``` for both creator-stream and creator-test-stream on Messages