export default function UserController() {
  async function postUserUseCase(userId, email) {
    return fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        email: email,
      }),
    }).then((res) => res.json());
  }

  async function getUserUseCase(userId) {
    return fetch("http://localhost:3001/api/users/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }

  async function deleteUserUseCase(userId) {
    return fetch("http://localhost:3001/api/users/" + userId, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return {
    postUserUseCase,
    getUserUseCase,
    deleteUserUseCase,
  };
}
