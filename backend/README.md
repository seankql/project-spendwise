# Spendwise - Backend Setup

## Local Env Setup

1. navigate to the `/backend` folder
   ```
   cd backend
   ```
2. Install all dependencies
   ```
   npm install
   ```
3. Setup `.env` file by renaming `.env_example` to `.env`. Feel free to update this file to your specification

4. Start/Create PostgreSQL locally by creating a database. Make sure the Database name and password match what is written in `.env`

5. Install Redis if not already installed

   ```
   brew install redis
   ```

6. Start Redis

   ```
   redis-server
   ```

7. run worker.js

   ```
   node worker.js
   ```

8. run cron.js for scheduled jobs

   ```
   node cron.js
   ```

9. Start the development backend
   ```
   npm run dev
   ```
10. The development backend will be running at http://localhost:3001

## Database Design

1. Users Table
   - This table would contain information about the user such as
     - id (primary key)
     - email
     - access_token
     - cursor
2. Accounts Table
   - This table would contain information about the financial accounts that each user has.
   - Contains fields such as
     - id (primary key)
     - userId (foregin key)
     - accountName
   - Each account should be associated with a user.
     - One user can have multiple account
     - One account must have one user
3. Transactions Table
   - This table would contain information about each transaction that a user makes including
     - id (primary key)
     - transactionDate
     - descriptions
     - amount
     - accountId (foregin key)
     - category
     - plaidTransactionId
   - Each transaction must be associated with one account & one category.

## Deployment

To be continued
