export default function AccountController() {
  const formData1 = [
    { id: 1, key: "First Name", value: "Bob" },
    { id: 2, key: "Last Name", value: "Bobs" },
    { id: 3, key: "Email", value: "Bob@gmail.com" },
    { id: 4, key: "Member Since", value: "Apr 19, 2017" },
  ];

  // Would be an async function that calls controller
  function getBasicInfoUseCase() {
    return { result: formData1, error: null };
  }

  async function getAccountsUseCase(userId) {
    return fetch("http://localhost:3001/api/accounts/user/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }

  async function postAccountUseCase(name, userId) {
    return fetch("http://localhost:3001/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        accountName: name,
      }),
    }).then((res) => res.json());
  }

  function getUserId(user){
    return user?.sub.split("|")[1];
  }

  return {
    postAccountUseCase,
    getBasicInfoUseCase,
    getAccountsUseCase,
    getUserId,
  };
}
