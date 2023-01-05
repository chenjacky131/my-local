const server = require('./ServerExample1');
const route = require('./router');
server.start(route.route)