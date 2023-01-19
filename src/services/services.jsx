import axios from "axios";

export async function loginUser(username, password) {
  let err = null;
  const res = await axios
    .post("/auth/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      err = error;
    });

  return await { res, err };
}

export async function registerUser(
  username,
  password,
  name = null,
  email = null
) {
  let err = null;
  const res = await axios
    .post("/auth/register", {
      username: username,
      password: password,
      name: name,
      email: email,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      err = error;
    });

  return await { res, err };
}

export async function getAllUser(token) {
  let err = null;
  const res = await axios
    .get("/users/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => (err = error));

  return await { res, err };
}

export async function changeUserRole(id, roleName, token) {
  let err = null;
  const res = await axios.post(
    `/users/${id}/role`,
    { roleName: roleName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await { res, err };
}

export async function getAllTask(token) {
  let err = null;
  const res = await axios.get(`/task/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await { res, err };
}

export async function createTask(token, titleTask, descTask, status, userId) {
  let err = null;
  const res = await axios.post(`/task/create`, {
    titleTask: titleTask,
    descTask: descTask,
    status: status,
    userId: userId
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await { res, err };
}