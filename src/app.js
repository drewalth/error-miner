/**
 * Setup
 */
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const clickRandomTarget = require('./click-random-target')

/**
 * Parsers
 */
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * Routes
 */
app.get('/ping', (req, res) => res.send('pong'))

app.post('/random-click', urlencodedParser, async function (req, res) {
  if (!req.body.url) {
    res.send('Error: Must provide URL.').status(422)
  } else if (!req.body.client) {
    res.send('Error: Must provide URL.').status(422)
  } else {
    res.send(`Crawling and Clicking: ${req.body.url}`).status(200)

    await clickRandomTarget({
      url: req.body.url,
      client: req.body.client,
      username: req.body.username || '',
      password: req.body.password || '',
      interval: req.body.interval || 5000,
      browsers: req.body.browsers ? req.body.browsers.split(',') : ['chrome', 'firefox'],
      loopLimit: req.body.loopLimit ? Number(req.body.loopLimit) : 10
    })
  }
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})
