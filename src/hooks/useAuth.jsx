import { useState } from 'react';

const useAuth = () => {
  const [authenticated] = useState(
    localStorage.getItem('accessToken') || null
  );

  const [username] = useState(
    localStorage.getItem('username') || null
  );

  const [role] = useState(
    localStorage.getItem('role') || null
  );

  return { authenticated, username, role };
};

export default useAuth;