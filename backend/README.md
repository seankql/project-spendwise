each users might have different accounts
and each account has many transactions

app.js: This is the main file that initializes the Express app, sets up middleware, and defines routes.

config/: This directory contains configuration files for the app, such as database settings, Plaid API credentials, and session options.

controllers/: This directory contains controller functions that handle requests and responses for each route.

models/: This directory contains database models for users, accounts, and transactions.

routes/: This directory contains route files that define the endpoints for the API.

static/: This directory contains static files such as stylesheets and client-side JavaScript files and html files for backend testing.

Backend Setup Steps

1. cd backend
2. npm install
3. Start/Create PostgreSQL locally by creating a database that matches what is in the config.js
4. npm run createTables to create all the tables that we need
5. npm run dropTables to clear our database
