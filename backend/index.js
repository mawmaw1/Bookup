const server = require('./dist/server');

const ip = process.argv[2];
const port = process.argv[3];

server(ip, port);