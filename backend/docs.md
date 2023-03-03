# SpendWise REST API Documentation

## Accounts API

### Create a new account using Plaid Connection

- To be added.

### Create a new account

- URL: `POST /api/accounts/`
  - content-type: `application/json`
  - Description: Create a new account for a user.
  - Request body: object
    - userId (string, required): ID of the user the account belongs to.
    - accountName (string, required): Name of the account to be created.
- Response: 201 Created
  - content-type: `application/json`
  - body: object
    - accountid: (number) the id of the account you just created
    - userid: (number) the id of the user that the account belongs to
    - accountname: (string) the name of the account you just created
- Response: 400
  - body: Bad Request
  - Description: Possible required fields are missing.
- Response: 500
  - body: Internal Server Error
  - Description: Possible userId is incorrect.

```
$ curl -X POST
       -H "Content-Type: `application/json`"
       -d '{"userId":"1","accountName":"Account_A"}'
       http://localhost:3001/api/accounts/'
```

### Update an account

- URL: `PUT /api/accounts/:accountId`
  - content-type: `application/json`
  - Description: Updates an existing account.
  - Request parameters:
    - accountId (number, required): The ID of the account to be updated.
  - Request body: Object
    - userId (string, required): The ID of the user the account belongs to.
    - accountName (string, required): The new name for the account.
  - Response: 200 OK
    - Content-Type: `application/json`
    - Body: Object
      - accountid (number): The ID of the updated account.
      - userid (string): The ID of the user the account belongs to.
      - accountname (string): The new name for the account.
  - Response: 400
    - Body: Bad Request
    - Description: One or more required fields are missing from the request body.
  - Response: 500
    - Body: Internal Server error
    - Description: Possible incorrect userId or accountId

```
$ curl -X PUT
       -H "Content-Type: `application/json`"
       -d '{"userId":"1","accountName":"Account_B"}'
       http://localhost:3001/api/accounts/123'
```

### Delete an account

- URL: `DELETE /api/accounts/:accountId`
  - content-type: `application/json`
  - Description: Delete an existing account for a user.
  - Request parameters:
    - accountId (number, required): ID of the account to be deleted.
  - response: 200
    - content-type: application/json
    - Body: object
      - accountid: (number) the id of the account that was deleted
      - userid: (string) the id of the user that the account belonged to
      - accountname: (string) the name of the account that was deleted
  - response: 400
    - body: Bad Request
    - Description: Possible incorrect accountId.
  - response: 500
    - body: Internal Server Error
    - Description: Possible incorrect accountId or userId.

```
$ curl -X DELETE
       -H "Content-Type: `application/json`"
       http://localhost:3001/api/accounts/1'
```

### Get all accounts for a user

- URL: `GET /api/accounts/user/:userId`
  - content-type: `application/json`
  - Description: Get all accounts for a user.
  - Request parameters:
    - userId (string, required): ID of the user to get the accounts for.
  - response: 200
    - content-type: `application/json`
    - body: object
      - accounts: (array) an array of all accounts belonging to the user
  - response: 400
    - body: Bad Request
    - Description: Possible incorrect userId.
  - response: 500
    - body: Internal Server Error
    - Description: Possible incorrect userId.

```
$ curl -X GET
       -H "Content-Type: `application/json`"
       http://localhost:3001/api/accounts/user/1'
```

## Reports API

### Generate Reports based on userId

- URL: `GET /api/reports?userId=${}&startDate=${}&endDate=${}`
  - content-type: `application/json`
  - Description: Generate Reports based on userId .
  - Query parameters:
    - userId (string, required): ID of the user to get the accounts for.
    - startDate (date, required): min startDate of the transactions. in XXXX-MM-DD format
    - endDate (date, required): max endDate of the transactions. in XXXX-MM-DD format
  - response: 200
    - content-type: `application/json`
    - body: object
      - transactions: (array) an array of all transactions belonging to the user across all his accounts in the specified time limits.
      - income: Total amount of income in this period of time.
      - expense: Total amount of expense in this period of time.
  - response: 400
    - body: Bad Request
  - response: 500
    - body: Internal Server Error

```
$ curl -X GET
       -H "Content-Type: `application/json`"
       http://localhost:3001/api/reports?userId=1&startDate=2023-01-02&endDate=2023-03-17'
```

### Generate Reports based on accountId

- URL: `GET /api/reports/accounts?accountId=${}&startDate=${}&endDate=${}`
  - content-type: `application/json`
  - Description: Generate Reports based on accountId .
  - Query parameters:
    - accountId (string, required): ID of the account to get the transactions for.
    - startDate (date, required): min startDate of the transactions. in XXXX-MM-DD format
    - endDate (date, required): max endDate of the transactions. in XXXX-MM-DD format
  - response: 200
    - content-type: `application/json`
    - body: object
      - transactions: (array) an array of all transactions belonging to the account in the specified time limits.
      - income: Total amount of income in this period of time.
      - expense: Total amount of expense in this period of time.
  - response: 400
    - body: Bad Request
  - response: 500
    - body: Internal Server Error

```
$ curl -X GET
       -H "Content-Type: `application/json`"
       http://localhost:3001/api/reports/accounts?accountId=1&startDate=2023-01-02&endDate=2023-03-17'
```

## Transactions API

### Get the most recent Transactions

- URL: `GET /api/transactions?userId={userId}&page={page}&pageSize={pageSize}`
  - content-type: `application/json`
  - Description: Get the most recent transactions for one user across all his/her accounts.
  - Query parameters:
    - userId (string, required): User ID to retrieve transactions for.
    - page (number, required): Page number of transactions to retrieve.
    - pageSize (number, required): Max number of transactions to retrieve per page.
  - response: 200
    - content-type: `application/json`
    - body: object
      - transactions: (array) an array of all transactions belonging to the user.
  - response: 400
    - body: Bad Request
    - Description: Possible Missing Required Fields.
  - response: 500
    - body: Internal Server Error
    - Description: Internal Server Error.

```
$ curl -X GET
       -H "Content-Type: `application/json`"
       http://localhost:3001/api/transactions?userId=1&page=0&pageSize=10'
```

### Create A new Transaction

- URL: `POST /api/transactions`
  - content-type: `application/json`
  - Description: Create A new Transaction
  - Request parameters:
    - transactionDate (string, required): Date of the transaction in YYYY-MM-DD format.
    - descriptions (string, required): Description of the transaction.
    - amount (number, required): Amount of the transaction.
    - accountId (string, required): ID of the account the transaction belongs to.
    - category (string, required): Category of the transaction.
  - response: 201
    - content-type: `application/json`
    - body: object
      - transactionid (number): The Id of the created Transaction
      - transactionDate (string): Date of the new transaction in YYYY-MM-DD format.
      - descriptions (string): Description of the new transaction.
      - amount (number): Amount of the new transaction.
      - accountId (string): ID of the account the new transaction belongs to.
      - category (string): Category of the new transaction.
  - response: 400
    - body: Bad Request
    - Description: Possible Missing Required Fields.
  - response: 500
    - body: Internal Server Error
    - Description: Internal Server Error.

```
$ curl -X POST
       -H "Content-Type: `application/json`"
       -d '{"transactionDate": "2023-03-16", "descriptions": "Test Test", "amount": 10000,"accountId": "1", "category": "Income"}'
       http://localhost:3001/api/transactions'
```

### Update A Transaction

- URL: `PUT /api/transactions/:transactionId`
  - content-type: `application/json`
  - Description: Update A new Transaction
  - Path parameters:
    - transactionId: (string, required): Id of the transaction you want to update
  - Request parameters:
    - transactionDate (string, required): Date of the transaction in YYYY-MM-DD format.
    - descriptions (string, required): Description of the transaction.
    - amount (number, required): Amount of the transaction.
    - accountId (string, required): ID of the account the transaction belongs to.
    - category (string, required): Category of the transaction.
  - response: 200
    - content-type: `application/json`
    - body: object
      - transactionid (number): The Id of the updated Transaction
      - transactionDate (string): Date of the updated transaction in YYYY-MM-DD format.
      - descriptions (string): Description of the updated transaction.
      - amount (number): Amount of the updated transaction.
      - accountId (string): ID of the account the updated transaction belongs to.
      - category (string): Category of the updated transaction.
  - response: 400
    - body: Bad Request
    - Description: Possible Missing Required Fields.
  - response: 500
    - body: Internal Server Error
    - Description: Internal Server Error.

```
$ curl -X PUT
       -H "Content-Type: `application/json`"
       -d '{"transactionDate": "2023-03-16", "descriptions": "Test Test", "amount": 10000,"accountId": "1", "category": "Income"}'
       http://localhost:3001/api/transactions/1'
```

### Delete A Transaction

- URL: `DELETE /api/transactions/:transactionId`
  - content-type: `application/json`
  - Description: Delete A new Transaction
  - Path parameters:
    - transactionId: (string, required): Id of the transaction you want to delete
  - response: 200
    - content-type: `application/json`
    - body: object
      - transactionid (number): The Id of the delete Transaction
      - transactionDate (string): Date of the delete transaction in YYYY-MM-DD format.
      - descriptions (string): Description of the delete transaction.
      - amount (number): Amount of the delete transaction.
      - accountId (string): ID of the account the delete transaction belongs to.
      - category (string): Category of the delete transaction.
  - response: 400
    - body: Bad Request
    - Description: Possible Missing Required Fields.
  - response: 500
    - body: Internal Server Error
    - Description: Internal Server Error.

```
$ curl -X DELETE
       -H "Content-Type: `application/json`"
       http://localhost:3001/api/transactions/1'
```

## Users API