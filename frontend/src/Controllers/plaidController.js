function handleResult(res) {
  if (!res.ok) {
    return;
  } else {
    return res.json();
  }
}

export default function PlaidController() {
  async function getPlaidLinkTokenUseCase(userId, token) {
    return fetch(
      "https://api.swx.cscc09.rocks:3001/api/plaid/link_token?" +
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
    ).then((res) => handleResult(res));
  }
  async function getPlaidLinkedStatusUseCase(userId, token) {
    return fetch(
      "https://api.swx.cscc09.rocks:3001/api/plaid/has_linked_plaid?" +
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
    return fetch("https://api.swx.cscc09.rocks:3001/api/plaid/token_exchange", {
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
        "https://api.swx.cscc09.rocks:3001/api/plaid/transactions/sync?" +
          new URLSearchParams({
            userId: userId,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res);
    });
  }

  return {
    getPlaidLinkTokenUseCase,
    getPlaidLinkedStatusUseCase,
    exchangePlaidTokenUseCase,
  };
}
