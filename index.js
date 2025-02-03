const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

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
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}



app.listen(8080, () => {
    console.log("web running on port 8080");
});

app.get("/version", (req, res) => {
    res.send("1.0");
});

console.log('listener running on port 8080');
