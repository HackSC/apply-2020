/*
  Util files for starting the server
*/

// Normalize a port into a number, string, or false.
const serverNormalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Event listener for HTTP server "error" event.
const serverOnError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event
const serverOnListening = server => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
};

// Generate Session Configuration that will be used on server instantiation
const createSessionConfigForEnv = envType => {
  const sessionSecret = envType == 'development' ? 'Insecure Dev Secret' : process.env.SESSION_SECRET;
const isDevEnvType = envType => {
  const devEnvTypes = ['development', 'test'];
  return devEnvTypes.includes(envType);
}

// Generate Session Configuration that will be used on server instantiation
const createSessionConfigForEnv = envType => {
  const sessionSecret = isDevEnvType(envType) ? 'Insecure Dev Secret' : process.env.SESSION_SECRET;

  var session = {
    secret: sessionSecret,
    cookie: {},
    resave: false,
    saveUninitialized: true,
  }

  if (envType == 'production') {
    session.cookie.secure = true;
  }
  return session;
};

export { serverNormalizePort, serverOnError, serverOnListening, createSessionConfigForEnv, isDevEnvType };
