import React, { useEffect, useState } from 'react';
import ManageRoomAmenities from './Manage/ManageRoomAmenities';
import ManageRoomInfo from './Manage/ManageRoomInfo';
import useInput from '../../hooks/useInput';
import LineBreak from '../../components/LineBreak';
import ManagePrice from './Manage/ManagePrice';
import { PausePresentation, Delete, Create } from '@material-ui/icons';
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
import { getAllRooms, getSingleRoom } from '../../firebase';
import Title from './Dashboard/Title';
import DropzonePreview from './Components/DropzonePreview';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ManageRoom = () => {
  const [values, setValues] = useState({
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
      footage: 0,
      guestMax: 0,
      guestMin: 0,
      privateBath: 0,
    },
    name: '',
    description: '',
    normalDayPrice: 0,
    holidayPrice: 0,
    imageUrl: [],
  });
  const [imageFiles, setImageFiles] = useState(values.imageUrl);

  const [currentRoomID, setCurrentRoomID] = useState('');
  const [allRooms, setAllRooms] = useState({});

  async function fetchRoomInfo() {
    const res = await getSingleRoom(currentRoomID);
    console.log(res.imageUrl);
    setImageFiles(res.imageUrl);
    setValues(res);
  }

  async function fetchAllRoom() {
    const res = await getAllRooms();
    // console.log(res);
    setAllRooms(res);
  }

  useEffect(() => {
    fetchAllRoom();
  }, []);

  useEffect(() => {
    if (currentRoomID === '') {
    } else {
      fetchRoomInfo();
    }
  }, [currentRoomID]);

  const {
    amenities,
    checkInAndOut,
    descriptionShort,
    description,
    imageUrl,
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

  useEffect(() => {
    console.log(values);
  }, [values]);

  const classes = useStyles();

  return (
    <>
      <div className="container wrapper-l">
        {/* {roomIsLoading ? (
          <MosaicSkeleton />
        ) : (
          <MosaicHeader name={name} images={imageUrl} />
        )} */}
        <main className="main">
          <div className="wrapper-m main__wrapper">
            <section className="main__left">
              <Paper className={classes.paper}>
                <Title>Thông Tin Phòng</Title>
                <DropzonePreview
                  {...{ imageFiles, setImageFiles, currentRoomID }}
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
                <h2>Tiện Nghi</h2>
                <ManageRoomAmenities {...{ amenities, setAmenities }} />
                <Divider className="divider" />
                <h2>Giá Cả</h2>
                <ManagePrice
                  {...{
                    normalDayPrice,
                    holidayPrice,
                    setFirstLevelValue,
                  }}
                />
                <div style={{ margin: 'auto' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Delete />}
                  >
                    Xóa
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Create />}
                  >
                    Chỉnh Sửa
                  </Button>
                </div>
              </Paper>
            </section>
            <section className="main__right">
              <Paper className={classes.paper}>
                <Table size="small">
                  <TableHead>
                    <Title>Danh Sách Phòng</Title>
                  </TableHead>
                  <TableBody>
                    {Object.keys(allRooms).map(roomKey => (
                      <TableRow
                        className="table_row"
                        onClick={() => setCurrentRoomID(roomKey)}
                        key={roomKey}
                      >
                        <TableCell>{allRooms[roomKey].name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default ManageRoom;
