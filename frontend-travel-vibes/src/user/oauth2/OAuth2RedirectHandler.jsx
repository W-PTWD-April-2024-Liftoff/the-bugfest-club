import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { useAuth } from '../../common/AuthContext';

const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  useEffect(() => {
    const getUrlParameter = (name) => {
      const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
      const results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      loadUser(); 
      navigate('/dashboard');
    } else {
      navigate('/login', { state: { error } });
    }
  }, [location, navigate, loadUser]);

  return null;
};

export default OAuth2RedirectHandler;
