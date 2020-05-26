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
const urlencodedParser = bodyParser.urlencoded({extended: false})

/**
 * Routes
 */
app.get('/ping', (req, res) => res.send('pong'));

app.post('/random-click', urlencodedParser, async function (req, res) {
  
  /**
   * @todo multiple responses. One at function start and end.
   */
  res.send(`Crawling and Clicking: ${req.body.url}`).status(200)

  await clickRandomTarget(req.body.url, req.body.keywords,req.body.username, req.body.password )
  
})

app.listen(port, () => {

  console.log(`App listening on http://localhost:${port}`)

})
