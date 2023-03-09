export default function TransactionsController() {
  async function getTransactionsUseCase(userId, page, pageSize) {
    return fetch(
      "http://localhost:3001/api/transactions?" +
        new URLSearchParams({
          userId: userId,
          page: page,
          pageSize: pageSize,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function createTransactionsUseCase(
    name,
    category,
    amount,
    accountId,
    date
  ) {
    return fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountId,
        descriptions: name,
        category: category,
        amount: amount,
        transactionDate: date,
      }),
    }).then((res) => res.json());
  }

  async function updateTransactionsUseCase(
    name,
    category,
    amount,
    accountId,
    date,
    transactionId
  ) {
    return fetch("http://localhost:3001/api/transactions/" + transactionId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountId,
        descriptions: name,
        category: category,
        amount: amount,
        transactionDate: date,
      }),
    }).then((res) => res.json());
  }

  async function deleteAccountsUseCase(transactionId) {
    return fetch("http://localhost:3001/api/transactions/" + transactionId, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return {
    getTransactionsUseCase,
    createTransactionsUseCase,
    updateTransactionsUseCase,
    deleteAccountsUseCase,
  };
}
