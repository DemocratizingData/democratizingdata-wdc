/* eslint-disable no-console */
const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

// utilize the same pattern for exiting port and cache settings
const serverPortNumber = process.env.SERVER_PORT || 8889;
const args = process.argv.slice(2);
const disableCache = Array.isArray(args) && args.includes('--no-cache');

// disable cache
const setCustomCacheControl = (res, path) => {
  console.log(`[HTTP Server] serving resource: ${path}`);

  if (disableCache) {
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
};

// serve root folder supporting relative path for accessing resources and cache settings
const serve = serveStatic('./dist', {
  setHeaders: setCustomCacheControl,
  index: [ 'index.html' ]
});

const httpServer = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});
httpServer.listen(serverPortNumber);

console.log(`[WDC HTTP Server] serving at: http://localhost:${serverPortNumber.toString().trim()}`);
console.log(`[WDC HTTP Server] disable serving resources with cache: ${disableCache}`);
