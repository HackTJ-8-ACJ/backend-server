const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

const lotId = "cb8f9d6e-3f74-47b7-9755-f5434d4b9b1e";

ws.on('open', function open() {
    ws.send("LOT: " + lotId);
});

ws.on('message', function incoming(data) {
    console.log(data);
});

setTimeout(() => {}, 1000);

ws.on('close', () => {console.log("closed")});
