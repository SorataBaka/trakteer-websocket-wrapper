const  { TrakteerClient } = require("./src/index.js")
const client = new TrakteerClient({
  mainChannelID: "",
  testChannelID: ""
})
client.on("subscribed", (data) => {
  console.log("Subscribed to channel", data.data.channel)
})
client.on("donation", (data) => {
  console.log(data)
})
client.on("close", ()=>{
  console.log("Socket closed")
})
setTimeout(()=>{
  client.close()
  console.log("Closing")
}, 10000)