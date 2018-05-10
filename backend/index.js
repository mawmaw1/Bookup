const server = require('./dist/server');

const port = process.argv[2] || 8081;
const ip = process.argv[3] || '127.0.0.1';

server(ip, port);