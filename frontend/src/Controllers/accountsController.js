export default function AccountsController() {
  async function getAccountsUseCase(userId, token) {
    return fetch("http://localhost:3001/api/accounts/user/" + userId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }

  async function createAccountsUseCase(userId, accountName, token) {
    return fetch("http://localhost:3001/api/accounts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        accountName: accountName,
      }),
    }).then((res) => res.json());
  }

  async function updateAccountsUseCase(userId, accountName, accountId, token) {
    return fetch("http://localhost:3001/api/accounts/" + accountId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        accountName: accountName,
      }),
    }).then((res) => res.json());
  }

  async function deleteAccountsUseCase(accountId, token) {
    return fetch("http://localhost:3001/api/accounts/" + accountId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  }

  return {
    getAccountsUseCase,
    createAccountsUseCase,
    updateAccountsUseCase,
    deleteAccountsUseCase,
  };
}
