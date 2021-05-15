import React, { createContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import Login from './Login';
import Router from './Router';

function ProtectedRoutes() {
  return (
    <Dashboard>
      <Router />
    </Dashboard>
  );
}

export const applyTheme = theme => {
  Object.keys(theme).forEach(key => {
    const value = theme[key];
    document.documentElement.style.setProperty(key, value);
  });
};

const AdminPage = () => {
  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  const user = useSelector(state => state.user);
  console.log(user);

  return <>{user != null && user.email ? <ProtectedRoutes /> : <Login />}</>;
};

export default AdminPage;

export const lightTheme = {
  '--bg': '#fff',
  '--primaryColor': '#37352f',
  '--secondaryColor': '#19171199',
  '--tertiaryColor': '#f7f6f3',
  '--accent': '#ED9C32',
  '--white': '#FFF',
  '--bs1': '0 0 10px 1px rgba(0, 0, 0, 0.1)',
  '--overlay': 'rgba(0, 0, 0, 0.6)',
  '--font': 'Fira Sans',
  '--ruler': '#37352f17',
};
