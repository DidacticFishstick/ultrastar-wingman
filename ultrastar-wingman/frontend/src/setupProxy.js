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
    app.use(
        '/proxy',
        createProxyMiddleware({
            target: 'http://localhost:8080/proxy',
            changeOrigin: true
        })
    );
    app.use(
        '/ws',
        createProxyMiddleware({
            target: 'http://localhost:8080/ws',
            changeOrigin: true
        })
    );
};
