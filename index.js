const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const latestVersion = "1.0";
const updateNeeded = false;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const textMessage = message.toString();
        console.log(textMessage);
        broadcast(textMessage);
    });

    ws.on('close', () => {
        
    });
});



function broadcast(message) {
    if (wss.clients.size > 0) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                try {
                    client.send(message);
                } catch (err) {
                    console.error('Error on broadcast: ', err);
                }
            }
        });
    }
}



server.listen(8080, () => {
    console.log("web running on port 8080");
});

app.get("/version", (req, res) => {
    res.send({ver: latestVersion, needed: updateNeeded});
});

console.log('listener running on port 8080');
