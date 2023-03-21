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

  return {
    getReportsUseCase,
    getAccountReportsUseCase,
    getCategoryReportsUseCase,
  };
}
