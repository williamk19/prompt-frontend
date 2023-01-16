import axios from 'axios';

export async function loginUser(username, password) {
  let err = null;
  const res = await axios.post('/auth/login', {
    username: username,
    password: password
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      err = error;
    });

  return await { res, err };
}

export async function registerUser(username, password, name = null, email = null) {
  let err = null;
  const res = await axios.post('/auth/register', {
    username: username,
    password: password,
    name: name,
    email: email
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      err = error;
    });
  
  return await { res, err };
}