# South Carolina Language Map

## Description:

A Full Stack web application for collecting and displaying sites in South Carolina where specific languages are spoken, and providing access to that data by both researchers and casual users. Sites are displayed on a map, are searchable, and display the details of the language spoken there.

Administrators have access to table views of the Sites, Languages, and Language Categories, with the ability to add, remove, and edit them. Administrators also have the ability to add other administrators.

## Screen Shots

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Create database and tables

- Create a new database called `sc_language_map`
- Run the code in database.sql to initialize the tables and import data

If you would like to name your database something else, you will need to change `sc_language_map` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Fork and Clone
- Babel needs extra configuration to avoid attempting to transpile Mapbox. To make sure the map canvas renders appropriately, follow these instructions:
  - Paste the following into package.json:
    ```
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all",
        "not chrome < 51",
        "not safari < 10"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
    ```
  - run `npx browserslist@latest --update-db` 
- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  REACT_APP_MAPBOX_ACCESS_TOKEN=mapboxAcessToken
  ```
   - Replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6`. The secret must be longer than 8 characters and not 'superDuperSecret' in order to avoid warnings.
   - In addition, you will need to replace `mapboxAccessToken` with a token from [https://mapbox.com](https://mapbox.com)
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`