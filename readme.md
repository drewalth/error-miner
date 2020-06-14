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
  url: 'http://localhost:8080', // Required
  keyword: "localhost", // Required
  username: 'foo', // Test user email
  password: 'bar', // Test user password
  browsers: 'firefox,chrome', // Default: 'firefox,chrome'
  loopLimit: '100' // Number of times to trigger random click. Default: '10'
})

```

## Warning

It is not advised to run this crawler on a production site. Since you are impersonating a real user account, It is recommended to create a test user account like: `test-user@foo.com`. Though unlikely, it would be unfortunate if the crawler clicked delete on a resource and then confirmed it.