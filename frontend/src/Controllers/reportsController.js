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
      "http://localhost:3001/api/reports?" +
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
    return fetch(
      "http://localhost:3001/api/reports/filters/" +
        userId +
        "/transactions?" +
        new URLSearchParams({
          limit: limit,
          offset: offset,
          accountId: accountId,
          transactionName: transactionName,
          startDate: startDate,
          endDate: endDate,
          minAmount: minAmount,
          maxAmount: maxAmount,
          categories: categories,
        }),
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
