import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage/index';
import DetailsPage from '../pages/DetailsPage/index';
import AdminPage from '../pages/AdminPage/index';
import ScrollToTop from './ScrollToTop';

const Router = () => (
  <>
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/room/:roomID" component={DetailsPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  </>
);

export default Router;
