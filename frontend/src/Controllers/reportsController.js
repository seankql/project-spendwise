function handleResult(res) {
  if (!res.ok) {
    return;
  } else {
    return res.json();
  }
}

export default function ReportsController() {
  async function getReportsUseCase(userId, token) {
    return fetch("https://api.spendw.cscc09.rocks/api/Reports/user/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => handleResult(res));
  }

  async function getReportsUseCase(userId, startDate, endDate, token) {
    return fetch(
      "https://api.spendw.cscc09.rocks/api/reports?" +
        new URLSearchParams({
          userId: userId,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => handleResult(res));
  }

  async function getAccountReportsUseCase(
    accountId,
    startDate,
    endDate,
    token
  ) {
    return fetch(
      "https://api.spendw.cscc09.rocks/api/reports/accounts?" +
        new URLSearchParams({
          accountId: accountId,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => handleResult(res));
  }

  async function getCategoryReportsUseCase(userId, startDate, endDate, token) {
    return fetch(
      "https://api.spendw.cscc09.rocks/api/reports/categories?" +
        new URLSearchParams({
          userId: userId,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => handleResult(res));
  }

  return {
    getReportsUseCase,
    getAccountReportsUseCase,
    getCategoryReportsUseCase,
  };
}
