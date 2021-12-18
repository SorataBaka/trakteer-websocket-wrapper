"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const events_1 = __importDefault(require("events"));
/**
 * Initiate a Trakteer Websocket Wrapper Client
 * @param widgetURL
 * @param socketURL
 */
class TrakteerSocket extends events_1.default {
    TrakteerToken;
    TrakteerSocket;
    PingIntervalTime = 25000;
    PingInterval;
    constructor(PARAMETER) {
        super();
        //Initiate required tokens and strings
        this.TrakteerToken = PARAMETER.widgetURL.split("stream?key=")[1];
        if (this.TrakteerToken === undefined) {
            throw "Widget URL invalid";
        }
        //Handle websocket connections
        this.TrakteerSocket = new ws_1.default("wss://socket.trakteer.id/app/2ae25d102cc6cd41100a");
        if (!this.TrakteerSocket) {
            throw "Socket URL Invalid";
        }
        this.TrakteerSocket.on('message', (data) => {
            const eventObject = JSON.parse(data.toString());
            //Handle connection to Trakteer WebSocket
            if (eventObject.event == "pusher:connection_established") {
                this.emit('connected', {
                    event: 'connected',
                    data: eventObject
                });
                this.TrakteerSocket.send(JSON.stringify({
                    event: "pusher:subscribe",
                    data: {
                        auth: "",
                        channel: PARAMETER.mainChannelID
                    }
                }));
                this.TrakteerSocket.send(JSON.stringify({
                    event: "pusher:subscribe",
                    data: {
                        auth: "",
                        channel: PARAMETER.testChannelID
                    }
                }));
                this.PingInterval = setInterval(() => {
                    this.TrakteerSocket.send(JSON.stringify({
                        event: "pusher:ping",
                        data: {}
                    }));
                }, this.PingIntervalTime);
            }
            if (eventObject.event == "pusher_internal:subscription_succeeded") {
                this.emit("subscribed", {
                    event: "subscribed",
                    data: eventObject
                });
            }
            if (eventObject.event == "pusher:pong") {
                this.emit("pong", {
                    event: "pong",
                    data: eventObject
                });
            }
            if (eventObject.event == "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated") {
                const donationData = JSON.parse(eventObject.data);
                this.emit('donation', {
                    event: "donation",
                    data: donationData
                });
            }
        });
        this.TrakteerSocket.on('close', (data) => {
            this.emit('close', {
                event: "close",
                data: data
            });
        });
    }
    close = () => {
        clearInterval(this.PingInterval);
        this.TrakteerSocket.close();
    };
}
module.exports = TrakteerSocket;
