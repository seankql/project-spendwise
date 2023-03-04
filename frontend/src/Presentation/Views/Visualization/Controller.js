export default function TransactionsController() {
  // Would be an async function that calls controller
  function getUsernameUseCase() {
    return { result: "bob", error: null };
  }
  
  async function getAccountsUseCase(userId) {
    return fetch("http://localhost:3001/api/accounts/user/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }

  return {
    getUsernameUseCase,
    getAccountsUseCase,
  };
}
