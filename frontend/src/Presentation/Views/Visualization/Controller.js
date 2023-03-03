export default function TransactionsController() {
  // Would be an async function that calls controller
  function getUsernameUseCase() {
    return { result: "bob", error: null };
  }

  function getAccountsUseCase() {
    return {
      result: [
        {
          label: "All accounts",
          value: "all",
        },
        {
          label: "TD - 5008531024",
          value: "TD - 5008531024",
        },
        {
          label: "RBC - 1001867295",
          value: "RBC - 1001867295",
        },
        {
          label: "CIBC - 1009671296",
          value: "CIBC - 1009671296",
        },
      ],
      error: null,
    };
  }

  return {
    getUsernameUseCase,
    getAccountsUseCase,
  };
}
