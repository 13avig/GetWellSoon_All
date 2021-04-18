const http = require("http");
const app = require("./app");
const debug = require('debug')('aggregationapp:index');

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

const onListening = () => {
  const addr = server.address();
  const bind = typeof add === 'string' ? `pipe${addr}` : `pipe${addr.port}`;
  debug('Listening on ' + bind);
};

const onError = (error) => {
  if (error.syscall !== 'listen') throw error;

  switch(error.code) {
    case 'EACCES':
      debug(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      debug(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
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
