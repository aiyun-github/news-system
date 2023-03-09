const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  );
  app.use(
    '/file',
    createProxyMiddleware({
      target: 'http://192.168.1.21:29080',
      changeOrigin: true,
    })
  );
};