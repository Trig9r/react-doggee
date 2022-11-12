import React from 'react';
import { Routes } from 'react-router-dom';

import { AuthRoutes, MainRoutes } from '@routes/routesConfig';

import './App.css';

function App() {
  const [isAuth, setAuth] = React.useState(false);

  return isAuth ? <MainRoutes /> : <AuthRoutes />;
}

export default App;
