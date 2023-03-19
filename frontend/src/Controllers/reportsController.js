export default function ReportsController() {
  async function getReportsUseCase(userId) {
    return fetch("http://localhost:3001/api/Reports/user/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }

  async function getReportsUseCase(userId, startDate, endDate) {
    return fetch(
      "http://localhost:3001/api/reports?" +
        new URLSearchParams({
          userId: userId,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function getAccountReportsUseCase(accountId, startDate, endDate) {
    return fetch(
      "http://localhost:3001/api/reports/accounts?" +
        new URLSearchParams({
          accountId: accountId,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function getCategoryReportsUseCase(userId, startDate, endDate) {
    return fetch(
      "http://localhost:3001/api/reports/categories?" +
        new URLSearchParams({
          userId: userId,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function getFilterReportsUseCase(
    userId,
    limit,
    offset,
    accountId,
    transactionName,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    categories
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
      "http://localhost:3001/api/reports/filters/" +
        userId +
        "/transactions?" +
        searchParams,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  return {
    getReportsUseCase,
    getAccountReportsUseCase,
    getCategoryReportsUseCase,
    getFilterReportsUseCase,
  };
}
