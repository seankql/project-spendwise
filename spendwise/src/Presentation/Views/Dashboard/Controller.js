export default function DashboardController() {
  // Would be an async function that calls controller
  function getUsernameUseCase() {
    return { result: "bob", error: null };
  }

  return {
    getUsernameUseCase,
  };
}
