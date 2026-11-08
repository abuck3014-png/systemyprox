const express = require('express');
const { createServer } = require('http');
const path = require('path');
const wisp = require('wisp-server-node');

const app = express();
const server = createServer();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.on('request', (req, res) => {
    app(req, res);
});

server.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`SYSTEMYPROX Scramjet Server listening at http://localhost:${PORT}`);
});
