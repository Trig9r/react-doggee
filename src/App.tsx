import React from 'react';

import { AuthRoutes, MainRoutes } from '@routes/routesConfig';
import { getCookie, deleteCookie } from '@utils/helpers';

import './App.css';

function App() {
  const [isAuth, setAuth] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const authCookie = getCookie('doggee-auth-token');
    const isNotMyDevice = getCookie('doggee-isNotMyDevice');

    const deviceExpire = isNotMyDevice && new Date().getTime() >= Number(isNotMyDevice);

    if (authCookie && deviceExpire) {
      deleteCookie('doggee-auth-token');
      deleteCookie('doggee-isNotMyDevice');
      setAuth(false);
    }

    if (authCookie && !deviceExpire) {
      setAuth(true);
    }

    setLoading(false);
  }, []);

  if (isLoading) return null;

  return isAuth ? <MainRoutes /> : <AuthRoutes />;
}

export default App;
