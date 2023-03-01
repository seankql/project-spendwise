# Spendwise - Backend Setup

## Prerequisites

- [Node.js]
- [PostgreSQL]

## Local Env Setup

1. navigate to `/backend` folder
   ```
   cd backend
   ```
2. Intall all dependencies
   ```
   npm install
   ```
3. Setup `.env` file by renaming `.env_example` to `.env`. Feel free to update this file to your specification

4. Start/Create PostgreSQL locally by creating a database. Make sure the Database name and password matches what is written in `.env`

5. Setup Database Tables
   ```
   npm run createTables
   ```
6. Start the development backend
   ```
   npm run dev
   ```
7. The development backend will be running at http://localhost:3000

8. To Drop All Tables
   ```
   npm run dropTables
   ```

## Deployment

To be continuted
