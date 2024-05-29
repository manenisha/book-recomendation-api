var app = require('./app');
const server = require('http').createServer(app);

server.listen(3000, () => {
    console.log('Server listening http at port %d', 3000);
});