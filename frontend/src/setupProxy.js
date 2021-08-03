const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/v1/search/movie.json', {
      target: 'https://openapi.naver.com',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/api/movies', {
      target: 'http://localhost:4000/',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/api/auth', {
      target: 'http://localhost:4000/',
      changeOrigin: true,
    }),
  );
};
