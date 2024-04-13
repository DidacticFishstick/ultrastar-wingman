const { createProxyMiddleware } = require('http-proxy-middleware');

// TODO: only for development
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080/api',
            changeOrigin: true
        })
    );
};
