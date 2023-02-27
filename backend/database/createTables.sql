-- create a schema
CREATE SCHEMA IF NOT EXISTS spendwise;

-- create a table in the schema
CREATE TABLE IF NOT EXISTS spendwise.my_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL
);
-- add rest of the tables in the schema