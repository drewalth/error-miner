# Error Miner

Simple website crawler which finds click targets and clicks at random with the intent of triggering and recording errors with sentry.io or any other logger.

## Getting Started

**Requirements**

- [Node.js](https://nodejs.org/en/)

**Installation**

`npm install`

**Development**

To start development with cold reloading: `npm run start:dev`

**Production**

Compile the app: `npm run build`

Start the server: `npm run start`

## Formatting HTTP Requests

```js

httpClient.post('{{api_base_url}}/random-click', {
  url: 'http://client.localdev:8080', // Required
  username: 'foo', // User login email
  password: 'bar', // User login password
  client: 'baz', // Required for client based navigation guard
  browsers: 'firefox,chrome', // Default: 'firefox,chrome'
  loopLimit: '100' // Number of times to trigger random click. Default: '10'
})

```