# Error Miner

Purpose is to load your app's routes, find all click targets; `<a>` or `<button>` tags, then click at random to see if anything triggers an error. Intended to be used with [Sentry.io](https://sentry.io/welcome/) or any custom logger.

## Development Mode
Start in development mode with `docker-compose -f docker-compose.dev.yaml up --build`. This will create three containers and start them up. First we will start nginx to proxy requests. A container running `webpack-dev-server` will handle default requests. 
Finally, a container running NodeJS and Express will handle requests to `/api`.

## Production Mode
Start in "production" mode with `docker-compose up --build` create three containers. First we will
start nginx to proxy requests. A container will bundle the static site by calling `npm run build`. Finally, a container 
running NodeJS and Express will handle requests to `/api`.

## Built With

- [Express](https://expressjs.com/)
- [Vue](https://vuejs.org/)
- [Nginx](https://www.nginx.com/)
- [Docker](https://www.docker.com/)
