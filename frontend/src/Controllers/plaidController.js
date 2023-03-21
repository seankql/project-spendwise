export default function PlaidController() {
  async function getPlaidLinkTokenUseCase(userId) {
    return fetch(
      "http://localhost:3001/api/plaid/link_token?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function syncPlaidTransactionsUseCase(userId) {
    return fetch(
      "http://localhost:3001/api/plaid/transactions/sync?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  async function getPlaidLinkedStatusUseCase(userId) {
    return fetch(
      "http://localhost:3001/api/plaid/has_linked_plaid?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
      }
    ).then((res) => res);
  }

  async function exchangePlaidTokenUseCase(userId, public_token) {
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
    getPlaidLinkTokenUseCase,
    syncPlaidTransactionsUseCase,
    getPlaidLinkedStatusUseCase,
    exchangePlaidTokenUseCase,
  };
}
