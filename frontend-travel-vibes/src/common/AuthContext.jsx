import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setLoading(false);
      setAuthenticated(false);
      setCurrentUser(null);
      return Promise.resolve(); 
    }

    return getCurrentUser()
      .then(user => {
        setCurrentUser(user);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setCurrentUser(null);
        setAuthenticated(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      authenticated,
      currentUser,
      loading,
      setAuthenticated,
      setCurrentUser,
      loadUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
