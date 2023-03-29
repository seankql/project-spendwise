export default function PlaidController() {
  async function getPlaidLinkTokenUseCase(userId, token) {
    return fetch(
      "http://localhost:3001/api/plaid/link_token?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
  }
  async function getPlaidLinkedStatusUseCase(userId, token) {
    return fetch(
      "http://localhost:3001/api/plaid/has_linked_plaid?" +
        new URLSearchParams({
          userId: userId,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res);
  }

  async function exchangePlaidTokenUseCase(userId, public_token, token) {
    return fetch("http://localhost:3001/api/plaid/token_exchange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        public_token: public_token,
      }),
    }).then((res) => {
      fetch(
        "http://localhost:3001/api/plaid/transactions/sync?" +
          new URLSearchParams({
            userId: userId,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
    });
  }

  return {
    getPlaidLinkTokenUseCase,
    getPlaidLinkedStatusUseCase,
    exchangePlaidTokenUseCase,
  };
}
