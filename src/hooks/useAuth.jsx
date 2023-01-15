import { useState } from 'react';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('accessToken') || null
  );

  return authenticated;
}

export default useAuth;