import React, { useEffect, useMemo, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getTodayConfirmationBooking } from '../../../firebase';
import { getReserveStartAndEnd } from '../../../utils';
import useStyles from '../../../hooks/useStyles';

// Generate Order Data
function createData({
  id,
  timestamp,
  guestName,
  tel,
  room,
  reserveStartAndEnd,
}) {
  return { id, timestamp, guestName, tel, room, reserveStartAndEnd };
}

export default function Orders(props) {
  const classes = useStyles();
  const { bookings } = props;

  const rows = useMemo(() => {
    return Object.values(bookings).map((booking, id) => {
      return createData({
        id,
        guestName: booking.guestName,
        timestamp: new Date(booking.timestamp).toLocaleTimeString(),
        room: booking.room.name,
        tel: booking.tel,
        reserveStartAndEnd: getReserveStartAndEnd(
          booking.reserveDateStart,
          booking.reserveDateEnd,
        ),
      });
    });
  }, [bookings]);

  // useEffect(() => {
  //   console.log(rows);
  // }, [rows]);

  let { url } = useRouteMatch();

  return (
    <>
      <Title>Khách Đặt Phòng Trong Hôm Nay</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Thời Gian</TableCell>
            <TableCell>Họ Tên</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Phòng</TableCell>
            <TableCell align="right">Ngày Đến - Đi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.reverse().map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.guestName}</TableCell>
              <TableCell>{row.tel}</TableCell>
              <TableCell>{row.room}</TableCell>
              <TableCell align="right">{row.reserveStartAndEnd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to={`${url}/reserve`}>Chi tiết</Link>
      </div>
    </>
  );
}
