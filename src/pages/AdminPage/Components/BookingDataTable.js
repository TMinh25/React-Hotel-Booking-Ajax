import React, { useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import {
  defaultFailCB,
  defaultSuccessCB,
  getReserveStartAndEnd,
  statusString,
} from '../../../utils';
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Cached } from '@material-ui/icons';
import useStyles from '../../../hooks/useStyles';
import { useHistory } from 'react-router';
import { refresh } from '../../../reducers/loading';
import { useDispatch, useSelector } from 'react-redux';
import { removeBooking } from '../../../reducers/bookings';

// Generate Order Data
function createData({
  id,
  uid,
  timestamp,
  guestName,
  tel,
  room,
  reserveStartAndEnd,
  statusString,
}) {
  return [
    id,
    uid,
    timestamp,
    guestName,
    tel,
    room,
    reserveStartAndEnd,
    statusString,
  ];
}

const textLabels = {
  body: {
    noMatch: 'Không Có Dữ Liệu',
    toolTip: 'Sắp Xếp',
    columnHeaderTooltip: column => `Sắp Xếp Cho ${column.label}`,
  },
  pagination: {
    next: 'Trang Tiếp',
    previous: 'Trang Trước',
    rowsPerPage: 'Số Lượng:',
    displayRows: 'của',
  },
  toolbar: {
    search: 'Tìm Kiếm',
    downloadCsv: 'Tải File CSV',
    print: 'In',
    viewColumns: 'Ẩn Cột',
    filterTable: 'Lọc',
  },
  filter: {
    all: 'Tất Cả',
    title: 'Lọc',
    reset: 'Hủy',
  },
  viewColumns: {
    title: 'Hiện Cột',
    titleAria: 'Ẩn/Hiện Cột',
  },
  selectedRows: {
    text: 'dòng đang chọn',
    delete: 'Xóa',
    deleteAria: 'Xóa Dòng Đang Chọn',
  },
};

function BookingDataTable(props) {
  const { data, title, ToolbarItem } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  const columns = [
    {
      name: 'id',
      options: { display: false, viewColumns: false, filter: false },
    },
    {
      name: 'uid',
      options: { display: false, viewColumns: false, filter: false },
    },
    {
      label: 'Thời Gian',
      options: {
        filter: false,
      },
    },
    {
      label: 'Họ Tên',
      options: {
        filter: false,
      },
    },
    {
      label: 'SĐT',
      options: {
        filter: false,
      },
    },
    'Phòng',
    {
      label: 'Ngày Đến - Đi',
      options: {
        filter: false,
      },
    },
    'Trạng Thái',
  ];

  const rows = useMemo(() => {
    const resultRows = [];
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'currentBookingData')
        resultRows.push(
          createData({
            id: resultRows.length,
            uid: key,
            guestName: value.guestName,
            timestamp: new Date(value.timestamp).toLocaleTimeString(),
            room: value.room.name,
            tel: value.tel,
            reserveStartAndEnd: getReserveStartAndEnd(
              value.reserveDateStart,
              value.reserveDateEnd,
            ),
            statusString: statusString[value.status],
          }),
        );
    }
    return resultRows;
  }, [data]);

  const onRowsDelete = async rowsDeleted => {
    const rowsToDelete = rowsDeleted.data.map(d => rows[d.dataIndex][1]);

    rowsToDelete.map(rowID => dispatch(removeBooking(rowID)));
  };

  const onRowClick = rowData => {
    const bookingID = rowData[1];
    history.push(`booking/${bookingID}`);
  };

  const handleReload = () => {
    dispatch(refresh());
  };

  const ReloadButton = () => (
    <>
      <Tooltip title={'Tải Lại'}>
        <IconButton onClick={handleReload}>
          <Cached />
        </IconButton>
      </Tooltip>
    </>
  );

  const setRowsColor = (row, dataIndex, rowIndex) => {
    // console.log(row[6]);
    switch (row[7]) {
      case statusString.reserveConfirmation:
      case statusString.checkingIn:
        return { className: 'yellow_row', style: { cursor: 'pointer' } };
      case statusString.reserveAccept:
      case statusString.paid:
      case statusString.checkedIn:
      case statusString.checkOut:
        return { className: 'green_row', style: { cursor: 'pointer' } };
      case statusString.notCheckIn:
      case statusString.reserveCancel:
        return { className: 'red_row', style: { cursor: 'pointer' } };
      default:
        break;
    }
  };

  const sortOrder = {
    name: 'id',
    direction: 'desc',
  };

  const options = {
    textLabels,
    onRowClick,
    onRowsDelete,
    customToolbar: () => (
      <>
        <ReloadButton />
        {ToolbarItem && <ToolbarItem />}
      </>
    ),
    setRowProps: setRowsColor,
    sortOrder,
  };

  const classes = useStyles();

  return (
    <>
      <MUIDataTable
        data={rows}
        {...{
          title,
          columns,
          options,
        }}
      />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default BookingDataTable;
