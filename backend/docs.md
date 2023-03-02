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

## Transactions API

## Users API
