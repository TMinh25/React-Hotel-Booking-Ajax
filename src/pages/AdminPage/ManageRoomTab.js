import React, { useEffect, useState } from 'react';
import ManageRoomAmenities from './Manage/ManageRoomAmenities';
import ManageRoomInfo from './Manage/ManageRoomInfo';
import ManagePrice from './Manage/ManagePrice';
import { Delete, Create } from '@material-ui/icons';
import {
  Button,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Title from './Components/Title';
import DropzonePreview from './Components/DropzonePreview';
import { useDispatch, useSelector } from 'react-redux';
import { offLoading, onLoading } from '../../reducers/loading';
import {
  addRoom,
  fetchAllRooms,
  getSingleRoom as getCurrentRoom,
  removeRoom,
  setCurrentRoom,
  updateRoomInfo,
} from '../../reducers/rooms';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ManageRoom = () => {
  const rooms = useSelector(state => state.rooms);
  const dispatch = useDispatch();
  const initialValue = {
    amenities: {
      wifi: false,
      breakfast: false,
      minibar: false,
      roomService: false,
      airConditioner: false,
      greatView: false,
      smokeFree: false,
      childFriendly: false,
      petFriendly: false,
    },
    checkInAndOut: {
      checkInEarly: '',
      checkInLate: '',
      checkOut: '',
    },
    descriptionShort: {
      bed: [],
      footage: null,
      guestMax: null,
      guestMin: null,
      privateBath: null,
    },
    name: '',
    description: '',
    normalDayPrice: null,
    holidayPrice: null,
    imageUrl: [],
  };
  const [values, setValues] = useState(initialValue);

  const [imageFiles, setImageFiles] = useState(values.imageUrl);
  const [previewFiles, setPreviewFiles] = useState([]);

  const [currentRoomID, setCurrentRoomID] = useState('');

  function fetchRoomInfo() {
    if (rooms === null) {
      dispatch(fetchAllRooms());
      if (currentRoomID) dispatch(getCurrentRoom(currentRoomID));
    }
    setImageFiles(rooms[currentRoomID].imageUrl);
    setValues(rooms[currentRoomID]);
    dispatch(offLoading());
  }

  useEffect(() => {
    if (currentRoomID === '') {
      dispatch(setCurrentRoom(null));
      setValues(initialValue);
      setImageFiles([]);
      setPreviewFiles([]);
    } else {
      dispatch(onLoading());
      fetchRoomInfo();
    }
    // eslint-disable-next-line
  }, [currentRoomID]);

  const {
    amenities,
    checkInAndOut,
    descriptionShort,
    description,
    normalDayPrice,
    holidayPrice,
    name,
  } = values;

  const setAmenities = ({ name, value }) => {
    setValues({ ...values, amenities: { ...amenities, [name]: value } });
  };

  const setCheckInAndOut = (name, value) => {
    setValues({
      ...values,
      checkInAndOut: { ...checkInAndOut, [name]: value },
    });
  };

  const setBed = value => {
    setValues({
      ...values,
      descriptionShort: { ...descriptionShort, bed: value },
    });
  };

  const setDescriptionShort = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      descriptionShort: { ...descriptionShort, [name]: value },
    });
  };

  const setFirstLevelValue = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCreateRoom = () => {
    var images = imageFiles;
    if (previewFiles.length !== 0) {
      images = previewFiles.map(file => file.image);
    }
    dispatch(addRoom(values, images));
  };

  const handleUpdateRoom = () => {
    var images = imageFiles;
    if (previewFiles.length !== 0) {
      images = previewFiles.map(file => file.image);
    }
    dispatch(updateRoomInfo(currentRoomID, values, images));
  };

  const handleDeleteRoom = () => {
    dispatch(removeRoom(currentRoomID));
  };

  const classes = useStyles();

  return (
    <>
      <div className="container wrapper-l">
        <main className="main">
          <div className="wrapper-m main__wrapper">
            <section className="main__left">
              <Paper className={classes.paper}>
                <Title>Thông Tin Phòng</Title>
                <DropzonePreview
                  {...{
                    imageFiles,
                    setImageFiles,
                    previewFiles,
                    setPreviewFiles,
                    currentRoomID,
                  }}
                />
                <ManageRoomInfo
                  {...{
                    descriptionShort,
                    setDescriptionShort,
                    checkInAndOut,
                    setCheckInAndOut,
                    name,
                    description,
                    setFirstLevelValue,
                    setBed,
                  }}
                />
                <ManageRoomAmenities {...{ amenities, setAmenities }} />
                <Divider className="divider" />
                <span className="room-info__check-title">Giá Cả</span>
                <ManagePrice
                  {...{
                    normalDayPrice,
                    holidayPrice,
                    setFirstLevelValue,
                  }}
                />
                {!currentRoomID && (
                  <>
                    <Button
                      onClick={handleCreateRoom}
                      style={{ margin: '30px 0px 15px' }}
                      className={classes.button}
                      endIcon={<Create />}
                    >
                      Thêm Phòng
                    </Button>
                  </>
                )}
              </Paper>
            </section>
            <section className="main__right">
              <Paper className={classes.paper}>
                <Table size="small">
                  <TableHead>
                    <Title>Danh Sách Phòng</Title>
                  </TableHead>
                  <TableBody>
                    {rooms &&
                      Object?.keys(rooms)?.map(roomKey => {
                        if (roomKey === 'currentRoom') return null;
                        return (
                          <TableRow
                            className="table_row"
                            onClick={() => setCurrentRoomID(roomKey)}
                            key={roomKey}
                          >
                            <TableCell>{rooms[roomKey]?.name}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                {currentRoomID && (
                  <div style={{ margin: 'auto' }}>
                    <Button
                      variant="contained"
                      onClick={() => setCurrentRoomID('')}
                      className={classes.button}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleDeleteRoom}
                      className={classes.button}
                      startIcon={<Delete />}
                    >
                      Xóa
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleUpdateRoom}
                      className={classes.button}
                      endIcon={<Create />}
                    >
                      Chỉnh Sửa
                    </Button>
                  </div>
                )}
              </Paper>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default ManageRoom;
