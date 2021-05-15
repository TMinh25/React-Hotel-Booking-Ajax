import React, { useEffect, useMemo, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getTodayBooking } from '../../../firebase';

function getReserveStartAndEnd(start, end) {
  const timeStart = new Date(start),
    timeEnd = new Date(end);

  console.log(timeStart, timeEnd);
  var res;

  if (timeStart.getMonth() === timeEnd.getMonth()) {
    res = `${timeStart.getDate()}-${timeEnd.getDate()} tháng ${timeStart.getMonth() +
      1}`;
  } else if (timeStart.getMonth() !== timeEnd.getMonth()) {
    res = `${timeStart.getDate()} tháng ${timeStart.getMonth() +
      1}-${timeEnd.getDate()} tháng ${timeEnd.getMonth() + 1}`;
  }
  return res;
}

// Generate Order Data
function createData({ id, timestamp, name, tel, room, reserveStartAndEnd }) {
  return { id, timestamp, name, tel, room, reserveStartAndEnd };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();

  const [bookings, setBookings] = useState({});

  useEffect(() => {
    async function getBookings() {
      const res = await getTodayBooking();
      console.log(res);
      setBookings(res);
    }
    getBookings();
  }, []);

  const rows = useMemo(() => {
    return Object.values(bookings).map((booking, id) => {
      return createData({
        id,
        name: booking.name,
        timestamp: new Date().toLocaleTimeString(),
        room: booking.room.name,
        tel: booking.tel,
        reserveStartAndEnd: getReserveStartAndEnd(
          booking.reserveDateStart,
          booking.reserveDateEnd,
        ),
      });
    });
  }, [bookings]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  let { url } = useRouteMatch();

  return (
    <React.Fragment>
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
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.name}</TableCell>
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
    </React.Fragment>
  );
}
