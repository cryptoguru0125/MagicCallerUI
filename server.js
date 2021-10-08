const http = require('http')
const fs = require('fs')
const resolvePath = require('path').resolve
const express = require('express')
const proxy = require('http-proxy-middleware')
const forceDomain = require('forcedomain')
const dotenv = require('dotenv-flow').config().parsed

const app = express()

app.use(
  forceDomain({
    hostname: 'www.magiccaller.com',
    excludeRule: /[a-zA-Z0-9][a-zA-Z0-9-]+\.magiccaller\.com/i,
    protocol: 'https',
  }),
)

app.use(
  proxy('/api', {
    target: 'http://localhost:8080',
    pathRewrite: {
      '^/api': '',
    },
    secure: false,
    changeOrigin: false,
  }),
)
app.use(express.static(resolvePath(__dirname, './build')))
app.get('/*', (req, res) => {
  const contents = fs.readFileSync(
    resolvePath(__dirname, './build/index.html'),
    'utf8',
  )
  res.send(contents)
})

const server = http.createServer(app)

server.listen(dotenv.PORT, () => {
  console.log('The front-end server listening on %d', dotenv.PORT)
})

module.exports = app
