import React, { useEffect } from 'react';
import NavAndDrawer from './Components/NavAndDrawer';
import { useSelector } from 'react-redux';
import Login from './Login';
import Router from './Router';
import Loading from '../../components/Loading';

function ProtectedRoutes() {
  const loading = useSelector(state => state.loading);

  return (
    <>
      <NavAndDrawer>
        <Router />
      </NavAndDrawer>
      {loading && <Loading />}
    </>
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

  const auth = useSelector(state => state.firebase.auth);

  if (!auth.isLoaded) return <Loading />;

  return <>{auth.isEmpty ? <Login /> : <ProtectedRoutes />}</>;
};

export default AdminPage;

const lightTheme = {
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
