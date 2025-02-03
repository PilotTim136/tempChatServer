const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
    ws.on('message', (message) => {
        const textMessage = message.toString();
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

console.log('Server is running on ws://localhost:8080');
