#!/usr/bin/env node

const http = require("http");
const app = require("../../app");


// Gets port from environment and store in Express
const port = process.env.PORT || 3000;
app.set('port', port);


// Event listener for HTTP server "listening" event
const onListening = () => {
    const addr = server.address();
    const bind = 'port ' + addr.port;
    console.log('Listening on ' + bind);
};


// Create HTTP server
const server = http.createServer(app);

// Listen for incoming connections
server.listen(port);
server.on('listening', onListening); 