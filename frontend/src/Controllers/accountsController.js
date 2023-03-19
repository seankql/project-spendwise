export default function AccountsController() {
  async function getAccountsUseCase(userId) {
    return fetch("http://localhost:3001/api/accounts/user/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }

  async function createAccountsUseCase(userId, accountName) {
    return fetch("http://localhost:3001/api/accounts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        accountName: accountName,
      }),
    }).then((res) => res.json());
  }

  async function updateAccountsUseCase(userId, accountName, accountId) {
    return fetch("http://localhost:3001/api/accounts/" + accountId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        accountName: accountName,
      }),
    }).then((res) => res.json());
  }

  async function deleteAccountsUseCase(accountId) {
    return fetch("http://localhost:3001/api/accounts/" + accountId, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return {
    getAccountsUseCase,
    createAccountsUseCase,
    updateAccountsUseCase,
    deleteAccountsUseCase,
  };
}
