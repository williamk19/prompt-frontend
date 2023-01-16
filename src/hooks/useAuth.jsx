import { useState } from 'react';

const useAuth = () => {
  const [authenticated] = useState(
    localStorage.getItem('accessToken') || null
  );

  return authenticated;
}

export default useAuth;