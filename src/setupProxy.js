const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://internal-backend-alb-1133284835.ap-northeast-2.elb.amazonaws.com:3001',
      changeOrigin: true,
    })
  );
};