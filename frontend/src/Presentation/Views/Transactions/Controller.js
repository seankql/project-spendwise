export default function TransactionsController() {
  // Would be an async function that calls controller
  function getUsernameUseCase() {
    return { result: "bob", error: null };
  }

  function getAccountsUseCase() {
    return {
      result: [
        {
          id: "2",
          value: "TD - 5008531024",
        },
        {
          id: "3",
          value: "RBC - 1001867295",
        },
        {
          id: "4",
          value: "CIBC - 1009671296",
        },
      ],
      error: null,
    };
  }

  async function getTransactionsUseCase(userId, page, pageSize) {
    return fetch("http://localhost:3001/api/transactions?" + new URLSearchParams({
      userId: userId,
      page: page,
      pageSize: pageSize,
    }), {
      method: "GET",
    }).then((res) => res.json());
  }

  return {
    getTransactionsUseCase,
    getUsernameUseCase,
    getAccountsUseCase,
  };
}
