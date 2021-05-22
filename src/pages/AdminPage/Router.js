import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AllBookingDataTab from './AllBookingDataTab';
import BookingDetailsTab from './BookingDetailsTab';
import CheckInAndOutTab from './CheckInAndOutTab';
import MainTab from './MainTab';
import ManageRoomTab from './ManageRoomTab';
import ReserveTab from './ReserveTab';
import StatisticTab from './StatisticTab';

const Router = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path} component={MainTab} />
        <Route
          path={`${path}/booking/:bookingID`}
          component={BookingDetailsTab}
        />
        <Route path={`${path}/reserve`} component={ReserveTab} />
        <Route path={`${path}/statistic`} component={StatisticTab} />
        <Route path={`${path}/allBooking`} component={AllBookingDataTab} />
        <Route path={`${path}/checkInAndOut`} component={CheckInAndOutTab} />
        <Route path={`${path}/manage-rooms`} component={ManageRoomTab} />
        <Route path={`${path}/manage-staffs`}>quản lý nhân viên</Route>
      </Switch>
    </>
  );
};

export default Router;
