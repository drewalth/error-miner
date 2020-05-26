/**
 * Setup
 */
require('dotenv').config()
const app = require('express')()
const port = process.env.PORT || 3000
const clickRandomTarget = require('./click-random-target')

/**
 * Parsers
 */
app.use(require('body-parser').json());
/**
 * Routes
 */
app.get('/api/ping', (req, res) => res.send('pong'));

app.post('/api/random-click', async function (req, res) {
  
  /**
   * @todo multiple responses. One at function start and end.
   */
  res.send(`Crawling and Clicking: ${req.body.url}`).status(200)

  await clickRandomTarget(req.body.url, req.body.keywords,req.body.username, req.body.password )
  
})

app.listen(port, () => {

  console.log(`API listening on http://localhost:${port}`)

})
