export default function DashboardController() {
  // Would be an async function that calls controller
  function getUsernameUseCase() {
    return { result: "bob", error: null };
  }

  async function getAccountsUseCase(userId) {
    return fetch("http://localhost:3001/api/accounts/user/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }

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

  function getUserId(user){
    return user?.sub.split("|")[1];
  }

  return {
    getTransactionsUseCase,
    getUsernameUseCase,
    getAccountsUseCase,
    getUserId,
  };
}
