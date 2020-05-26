# Error Miner

Purpose is to load your app's routes, find all click targets; `<a>` or `<button>` tags, then click at random to see if anything triggers an error. Intended to be used with [Sentry.io](https://sentry.io/welcome/) or any custom logger.

## Getting Started
First you'll need [Node](https://nodejs.org/en/) and [Docker](https://www.docker.com/) installed locally on your machine.

Once installed, cd into project root, then run `npm run setup`, this will build our Docker containers.

#### Development 
To start the app for development run `npm run serve`. This is bring up Webpack Dev Server and the Express API with hot reloading.

#### Production
 To serve the app in production mode: `npm run build`. This will compile the Vue app for production and remove Flow type notations from the API.

## Built With

- [Vue](https://vuejs.org/)
- [Express](https://expressjs.com/)
- [Nginx](https://www.nginx.com/)
- [Docker](https://www.docker.com/)