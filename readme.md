# Error Miner

Small experiment with Selenium. Purpose is to load your app's routes, find all click targets, then click at random to see if anything triggers an error. Intended to be used with [Sentry.io](https://sentry.io/welcome/) or any custom logger.

### Todo

- Build UI with form to provide app the URL you'd like to test as well as toggle which actions you'd like the script to take. For example, "loop through all `/user/:id` routes starting with user id 1 and ending with id 8000" or "load this one url, and click random `<a>` and `<button>` tags" 

- Package inside Electron app to easily distribute amongst QA team.