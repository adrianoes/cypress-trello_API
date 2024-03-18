# cypress-trello_API

Sample project to demonstrate basic api tests using the trello api (https://developer.atlassian.com/cloud/trello/rest/). Some good practices were used here such as custom commands, hooks, fixture file so we can deal with a few values that are rewriten after every test, an env.json file (called in gitignore) so we can store sensitive information and a github secret so we can deal with this info in github actions.

# Pre-requirements:

- Cypress 13.6.6
- cypress-plugin-api: 2.11.1
- Node.js 18.18.0
- npm 10.2.4
- Yarn 1.22.19 (Optional)

# Instalation:

- See "https://nodejs.org/en" and install the aforementioned Node.js version.
- To use yarn packet manager, open windows prompt as admin and execute the "corepack enable" command.
- "yarn init", to initiate a node project. You can configure it as you wish.
- "yarn add cypress -D", to install cypress as a dev dependencie. 
- "npm i cypress-plugin-api -D", to install cypress api plugin.

# Tests

- "yarn cypress open", to open cypress app and execute step by step, being able to debug the execution. 
- "yarn cypress run", to execute cypress in headless mode.