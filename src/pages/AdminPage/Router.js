import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MainTab from './MainTab';
import ManageRoomTab from './ManageRoomTab';

const Router = () => {
  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <MainTab />
        </Route>
        <Route path={`${path}/reserve`}>reserve</Route>
        <Route path={`${path}/manage-rooms`}>
          <ManageRoomTab />
        </Route>
        <Route path={`${path}/manage-staffs`}>quản lý nhân viên</Route>
      </Switch>
    </>
  );
};

export default Router;
