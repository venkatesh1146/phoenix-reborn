/**
Author - Venkatesh Pullaganti 😃
Git - https://github.com/venkatesh1146
* */

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.SERVER_PORT || 3000

const pheonixBaseUrl = '/rise'

app
  .prepare()
  .then(() => {
    const server = express()
    server.use((req, res, next) => {
      next()
    })

    server.get('/health', (req, res) => res.send('Hello From Pheonix Rise!'))

    server.get(`${pheonixBaseUrl}/proposal`, (req, res) => {
      const actualPage = '/proposal'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get(`${pheonixBaseUrl}/kyc-verification`, (req, res) => {
      const actualPage = '/kyc-verification'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get(`${pheonixBaseUrl}/order-placed`, (req, res) => {
      const actualPage = '/order-placed'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get(`${pheonixBaseUrl}/success`, (req, res) => {
      const actualPage = '/success'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      req.url = req.url.replace(/\/$/, '')
      if (req.url === '') {
        req.url = '/'
      }
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
