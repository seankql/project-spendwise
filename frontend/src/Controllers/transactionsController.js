export default function TransactionsController() {
  async function getTransactionsUseCase(userId, page, pageSize, token) {
    return fetch(
      "http://localhost:3001/api/transactions?" +
        new URLSearchParams({
          userId: userId,
          page: page,
          pageSize: pageSize,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
  }

  async function createTransactionsUseCase(
    name,
    category,
    amount,
    accountId,
    date,
    token
  ) {
    return fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    transactionId,
    token
  ) {
    return fetch("http://localhost:3001/api/transactions/" + transactionId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  async function deleteTransactionsUseCase(transactionId, token) {
    return fetch("http://localhost:3001/api/transactions/" + transactionId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }

  async function getFilterTransactionsUseCase(
    userId,
    limit,
    offset,
    accountId,
    transactionName,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    categories,
    token
  ) {
    let searchParams = new URLSearchParams({
      limit: limit,
      offset: offset,
    });
    if (accountId) searchParams.set("accountId", accountId);
    if (transactionName) searchParams.set("transactionName", transactionName);
    if (startDate) searchParams.set("startDate", startDate);
    if (endDate) searchParams.set("endDate", endDate);
    if (minAmount) searchParams.set("minAmount", minAmount);
    if (maxAmount) searchParams.set("maxAmount", maxAmount);
    if (categories) searchParams.set("categories", categories);
    return fetch(
      "http://localhost:3001/api/transactions/filters/" +
        userId +
        "/transactions?" +
        searchParams,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
  }

  return {
    getTransactionsUseCase,
    getFilterTransactionsUseCase,
    createTransactionsUseCase,
    updateTransactionsUseCase,
    deleteTransactionsUseCase,
  };
}
