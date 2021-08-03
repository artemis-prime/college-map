const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/ed/collegescorecard',
    createProxyMiddleware({
      target: 'https://api.data.gov/',
      changeOrigin: true
    })
  )
}

