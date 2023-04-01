function handleResult(res) {
  if (!res.ok) {
    return;
  } else {
    return res.json();
  }
}

export default function UserController() {
  async function postUserUseCase(auth0UserId, email, token) {
    return fetch("http://api.swx.cscc09.rocks:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        auth0UserId: auth0UserId,
        email: email,
      }),
    }).then((res) => handleResult(res));
  }

  async function getUserUseCase(auth0UserId, token) {
    return fetch("https://api.swx.cscc09.rocks:3001/api/users/" + auth0UserId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => handleResult(res));
  }

  async function deleteUserUseCase(auth0UserId, token) {
    return fetch("https://api.swx.cscc09.rocks:3001/api/users/" + auth0UserId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => handleResult(res));
  }

  return {
    postUserUseCase,
    getUserUseCase,
    deleteUserUseCase,
  };
}
