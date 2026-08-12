const http = require('http');
const https = require('https');

const UPSTREAM = "https://sullyos-amsg.1121yuy0610.workers.dev";

const server = http.createServer((req, res) => {
  const targetUrl = new URL(req.url, UPSTREAM);
  const proxyReq = https.request(targetUrl, {
    method: req.method,
    headers: req.headers
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  req.pipe(proxyReq);
  proxyReq.on('error', err => {
    res.writeHead(502);
    res.end("proxy error");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{});
