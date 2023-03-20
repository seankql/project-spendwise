export default function UserController() {
  async function postUserUseCase(auth0UserId, email) {
    return fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth0UserId: auth0UserId,
        email: email,
      }),
    }).then((res) => res.json());
  }

  async function getUserUseCase(auth0UserId) {
    return fetch("http://localhost:3001/api/users/" + auth0UserId, {
      method: "GET",
    }).then((res) => res.json());
  }

  async function deleteUserUseCase(auth0UserId) {
    return fetch("http://localhost:3001/api/users/" + auth0UserId, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  return {
    postUserUseCase,
    getUserUseCase,
    deleteUserUseCase,
  };
}
