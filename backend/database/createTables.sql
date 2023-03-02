-- create a schema
CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS Users (
  userId SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Accounts (
  accountId SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES Users(userId),
  accountName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Transactions (
  transactionId SERIAL PRIMARY KEY,
  transactionDate DATE NOT NULL,
  descriptions VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  accountId INTEGER NOT NULL REFERENCES Accounts(accountId),
  category VARCHAR(255) NOT NULL
);

-- Insert some sample data for local testing
INSERT INTO Users (username, hashedPassword, email)
VALUES
('user1', 'password1', 'user1@example.com'),
('user2', 'password2', 'user2@example.com'),
('user3', 'password3', 'user3@example.com');

INSERT INTO Accounts (userId, accountName)
VALUES
(1, 'Account 1 A'),
(1, 'Account 1 B'),
(2, 'Account 2 A'),
(3, 'Account 3 A');

INSERT INTO Transactions (transactionDate, descriptions, amount, accountId, category)
VALUES
('2023-01-01', 'Groceries', 50.00, 1, 'Food'),
('2023-01-02', 'Gas', 30.00, 1, 'Transportation'),
('2023-01-03', 'Salary', 2000.00, 1, 'Income'),
('2023-01-04', 'Rent', 1000.00, 2, 'Housing'),
('2023-01-05', 'Dinner', 100.00, 2, 'Food'),
('2023-01-06', 'Internet', 50.00, 3, 'Utilities'),
('2023-01-07', 'Coffee', 5.00, 3, 'Food');

