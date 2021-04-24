const http = require("http");
const app = require("./app");
const debug = require('debug')('aggregationapp:index');
const config = require('./config');

/**
 * Required functions
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  switch(true) {
    case isNaN(port): return val;
    case (port >= 0): return port;
  }

  return false;
};

const getBind = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? addr : `${addr.address}${addr.port}`;
  return bind;
};

const onListening = () => {
  const bind = getBind();
  debug('Listening on ' + bind);
};

const onError = (error) => {
  if (error.syscall !== 'listen') throw error;

  switch(error.code) {
    case 'EACCES':
      debug(port + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      debug(port + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port);
app.set('port', port);
 
/**
 * Create HTTP server.
 */

const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
