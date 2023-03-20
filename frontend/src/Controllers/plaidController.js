export default function PlaidController() {
  async function getPlaidLinkToken(userId) {
    return fetch(
      "http://localhost:3001/api/plaid/?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function syncPlaidTransactions(userId) {
    return fetch(
      "http://localhost:3001/api/plaid/transactions/?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function getPlaidLinkedStatus(userId) {
    return fetch(
      "http://localhost:3001/api/plaid/has_linked_plaid/?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function exchangePlaidToken(userId, public_token) {
    return fetch("http://localhost:3001/api/plaid/token_exchange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        public_token: public_token,
      }),
    }).then((res) => res.json());
  }

  return {
    getPlaidLinkToken,
    syncPlaidTransactions,
    getPlaidLinkedStatus,
    exchangePlaidToken,
  };
}
