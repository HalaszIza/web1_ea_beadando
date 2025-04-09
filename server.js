const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", socket => {
    setInterval(() => {
        let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        socket.send(randomColor);
    }, 1000);
});
