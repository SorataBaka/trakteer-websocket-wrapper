"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const events_1 = __importDefault(require("events"));
/**
 * Initiate a Trakteer Websocket Wrapper Client
 * @param socketURL
 */
class TrakteerSocket extends events_1.default {
    TrakteerSocket;
    PingIntervalTime = 25000;
    PingInterval;
    mainChannelID;
    testChannelID;
    constructor(PARAMETER) {
        super();
        if (!PARAMETER.mainChannelID || !PARAMETER.testChannelID) {
            throw "Insufficient parameters provided. mainChannelID and testChannelID required.";
        }
        this.mainChannelID = PARAMETER.mainChannelID;
        this.testChannelID = PARAMETER.testChannelID;
        //Handle websocket connections
        this.TrakteerSocket = new ws_1.default("wss://socket.trakteer.id/app/2ae25d102cc6cd41100a");
        if (!this.TrakteerSocket) {
            throw "Socket URL Invalid";
        }
        this.TrakteerSocket.on('error', (data) => {
            this.emitEvent("websocketerror", data);
        });
        this.TrakteerSocket.on('close', (data) => {
            this.emitEvent("websocketclosed", data);
        });
        this.TrakteerSocket.on('message', (data) => {
            const eventObject = JSON.parse(data.toString());
            console.log(eventObject);
            //Handle connection to Trakteer WebSocket
            if (eventObject.event == "pusher:connection_established") {
                this.emitEvent("connected", eventObject);
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
                this.emitEvent("subscribed", eventObject);
            }
            if (eventObject.event == "pusher:pong") {
                this.emitEvent("pong", eventObject);
            }
            if (eventObject.event == "pusher:subscription_error") {
                this.emitEvent("subscription_error", eventObject);
            }
            if (eventObject.event == "pusher:error") {
                this.emitEvent("error", eventObject);
            }
            if (eventObject.event == "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated") {
                const donationData = JSON.parse(eventObject.data);
                this.emitEvent("donation", donationData);
            }
        });
        this.TrakteerSocket.on('close', (data) => {
            this.emit('close', {
                event: "close",
                data: data
            });
            this.TrakteerSocket.close();
        });
    }
    close = () => {
        this.TrakteerSocket.send(JSON.stringify({
            event: "pusher:close",
            data: {
                channel: this.mainChannelID
            }
        }));
        this.TrakteerSocket.send(JSON.stringify({
            event: "pusher:close",
            data: {
                channel: this.testChannelID
            }
        }));
        clearInterval(this.PingInterval);
        this.TrakteerSocket.close();
        this.emitEvent("close", {
            event: "close",
            data: ""
        });
    };
    interval = (newInterval) => {
        clearInterval(this.PingInterval);
        this.PingInterval = setInterval(() => {
            this.TrakteerSocket.send(JSON.stringify({
                event: "pusher:ping",
                data: {}
            }));
        }, newInterval);
        return this.PingInterval;
    };
    emitEvent = (eventName, eventObject) => {
        this.emit(eventName, {
            event: eventName,
            data: eventObject
        });
    };
}
module.exports = TrakteerSocket;
