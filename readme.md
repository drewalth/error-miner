# Error Miner

[![Build Status](https://travis-ci.org/drewalth/error-miner.svg?branch=master)](https://travis-ci.org/drewalth/error-miner)

A simple website crawler that finds click targets in the DOM, `<a>` and `<button>` tags, then clicks at random. Intended to be used in QA or Staging environments to trigger, log, then fix errors that may have slipped into production.

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
  url: 'http://localhost:8080', // Required
  keyword: "localhost", // Required
  username: 'foo', // Test user email
  password: 'bar', // Test user password
  browsers: 'firefox,chrome', // Default: 'firefox,chrome'
  loopLimit: '100' // Number of times to trigger random click. Default: '10'
})

```
