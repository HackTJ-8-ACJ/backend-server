const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log("created server");

const main = () => {
    const lots = new Map();

    wss.on('connection', (ws, req) => {
        let valid = false;

        console.log("established connection.");

        ws.on('message', function incoming(message) {
            let msg = message.toString();
            if (msg.startsWith("LOT: ")) {
                valid = true;

                // establish subscription connection
                let lotId = msg.replace("LOT: ", "");
                if (!lots[lotId]) lots[lotId] = []

                lots[lotId].push(ws);
            }
        });

        ws.send('something');

        // close invalid connections
        setTimeout(() => {
            if (!valid) ws.close();
        }, 1000);
    });

    const status = async () => {
        console.log(lots.size);

        lots.forEach((value, lotId, map) => {
            console.log("lot: ", lotId, " #: ", value.length);
        })

        setTimeout(() => {
            status();
        }, 3000);
    }

    status()
    .then(() => {
        console.log("done")
    })
    .catch((e) => {
        console.log("error", e)
    })
}

main();