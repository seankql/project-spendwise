function handleResult(res) {
  if (!res.ok) {
    return;
  } else {
    return res.json();
  }
}

export default function AccountsController() {
  async function getAccountsUseCase(userId, token) {
    return fetch(
      "https://api.swx.cscc09.rocks:3001/api/accounts/user/" + userId,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => handleResult(res));
  }

  async function createAccountsUseCase(userId, accountName, token) {
    return fetch("https://api.swx.cscc09.rocks:3001/api/accounts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        accountName: accountName,
      }),
    }).then((res) => handleResult(res));
  }

  async function updateAccountsUseCase(userId, accountName, accountId, token) {
    return fetch("https://api.swx.cscc09.rocks:3001/api/accounts/" + accountId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        accountName: accountName,
      }),
    }).then((res) => handleResult(res));
  }

  async function deleteAccountsUseCase(accountId, token) {
    return fetch("https://api.swx.cscc09.rocks:3001/api/accounts/" + accountId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => handleResult(res));
  }

  return {
    getAccountsUseCase,
    createAccountsUseCase,
    updateAccountsUseCase,
    deleteAccountsUseCase,
  };
}
