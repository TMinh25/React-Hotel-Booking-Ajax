import {
  Button,
  Grid,
  // IconButton,
  Paper,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useStyles from '../../hooks/useStyles';
// import { Create } from '@material-ui/icons';
import {
  isToday,
  numberWithCommas,
  statusCode,
  statusString,
} from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSingleBookingData,
  updateBookingStatus,
} from '../../reducers/bookings';

function BookingDetailsTab(props) {
  const classes = useStyles();
  const history = useHistory();
  const { bookingID } = useParams();
  // const [isModified, setIsModified] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // const { isLoading, data, error } = useFetchFirebase(
  //   getSingleBookingData,
  //   bookingID,
  // );

  const dispatch = useDispatch();
  const currentBookingData = useSelector(
    state => state.bookings?.currentBookingData,
  );

  useEffect(() => {
    dispatch(fetchSingleBookingData(bookingID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingID]);

  useEffect(() => {
    // setBookingData(data);
    if (currentBookingData) {
      switch (currentBookingData?.status) {
        case statusCode.reserveConfirmation:
        case statusCode.reserveAccept:
          setActiveStep(0);
          break;
        case statusCode.reserveCancel:
        case statusCode.checkingIn:
        case statusCode.paid:
          setActiveStep(1);
          break;
        case statusCode.checkedIn:
          setActiveStep(2);
          break;
        case statusCode.notCheckIn:
          setActiveStep(3);
          break;

        default:
          break;
      }
    }
  }, [currentBookingData]);

  let steps = [];

  switch (currentBookingData?.status) {
    case 'reserveConfirmation':
    case 'reserveCancel':
      steps = [
        statusString.reserveConfirmation,
        statusString.reserveCancel,
        statusString.reserveAccept,
      ];
      break;
    case 'reserveAccept':
    case 'checkingIn':
    case 'checkedIn':
    case 'notCheckIn':
      steps = [
        statusString.reserveAccept,
        statusString.checkingIn,
        statusString.checkedIn,
        statusString.notCheckIn,
      ];
      break;
    case 'checkOut':
    case 'paid':
      steps = [statusString.checkOut, statusString.paid];
      break;
    default:
      break;
  }

  const changeBookingStatus = status => {
    dispatch(
      updateBookingStatus({
        id: bookingID,
        status,
      }),
    );
  };

  const handleGoBack = () => {
    history.goBack();
    // dispatch(clearCurrentBookingData());
  };

  const NextButton = () => {
    var buttonLabel = '';
    var onClick = () => history.go(0);
    switch (currentBookingData?.status) {
      case statusCode.reserveConfirmation:
        buttonLabel = 'Xác nhận đặt phòng';
        onClick = () => {
          changeBookingStatus(statusCode.reserveAccept);
        };
        break;
      case statusCode.checkingIn:
        if (isToday(currentBookingData?.reserveDateStart)) {
          buttonLabel = 'Check In';
          onClick = () => {
            changeBookingStatus(statusCode.checkedIn);
          };
        } else buttonLabel = '';
        break;
      case statusCode.checkedIn:
        buttonLabel = 'Check Out';
        onClick = () => {
          changeBookingStatus(statusCode.checkOut);
        };
        break;
      case statusCode.checkOut:
        buttonLabel = 'Đã Thanh Toán';
        onClick = () => {
          changeBookingStatus(statusCode.paid);
        };
        break;
      default:
        break;
    }
    if (buttonLabel)
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          className={classes.button}
        >
          {buttonLabel}
        </Button>
      );
    else return null;
  };

  const BackButton = () => {
    var buttonLabel = '';
    var onClick = null;
    var color = 'secondary';
    switch (currentBookingData?.status) {
      case statusCode.reserveConfirmation:
        buttonLabel = 'Hủy Đặt Phòng';
        onClick = () => {
          changeBookingStatus(statusCode.reserveCancel);
        };
        break;
      case statusCode.reserveAccept:
      case statusCode.checkingIn:
        if (isToday(currentBookingData?.reserveDateStart)) {
          buttonLabel = 'Không Check In';
          onClick = () => {
            changeBookingStatus(statusCode.notCheckIn);
          };
        } else {
          buttonLabel = 'Hủy Đặt Phòng';
          onClick = () => {
            changeBookingStatus(statusCode.reserveCancel);
          };
        }
        break;
      default:
        break;
    }
    if (buttonLabel)
      return (
        <Button color={color} onClick={onClick} className={classes.button}>
          {buttonLabel}
        </Button>
      );
    else return null;
  };

  return (
    <>
      {currentBookingData && (
        <Paper className={classes.paper2}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ marginBottom: 16 }}
          >
            Thông tin đặt phòng
          </Typography>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                // onClick={handleStep(index)}
                // completed={completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
            {/* <IconButton>
              <Create />
            </IconButton> */}
          </Stepper>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="guestName"
                  value={currentBookingData?.guestName}
                  // disabled={!isModified}
                  label="Họ tên khách hàng"
                  fullWidth
                  autoComplete="cc-name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="tel"
                  label="Số Điện Thoại"
                  value={currentBookingData?.tel}
                  // disabled={!isModified}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="roomName"
                  value={currentBookingData?.room.name}
                  label="Phòng Đặt"
                  // disabled={!isModified}
                  fullWidth
                  autoComplete="cc-exp"
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <TextField
                  required
                  name="reserveDateStart"
                  value={new Date(
                    currentBookingData?.reserveDateStart,
                  ).toLocaleDateString('vi-VN')}
                  // disabled={!isModified}
                  style={{ width: '50%' }}
                  label="Ngày Check In"
                />
                <TextField
                  required
                  name="reserveDateEnd"
                  value={new Date(
                    currentBookingData?.reserveDateEnd,
                  ).toLocaleDateString('vi-VN')}
                  // disabled={!isModified}
                  style={{ width: '50%' }}
                  label="Ngày Check Out"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Thời Gian Đặt Phòng"
                  name="timestamp"
                  value={new Date(currentBookingData?.timestamp).toLocaleString(
                    'vi-VN',
                  )}
                  // disabled={!isModified}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tổng tiền"
                  name="totalPrice"
                  value={
                    numberWithCommas(currentBookingData?.totalPrice) + ' VNĐ'
                  }
                  // disabled={!isModified}
                  fullWidth
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button onClick={handleGoBack} className={classes.button}>
                Quay lại
              </Button>
              <BackButton />
              <NextButton />
            </div>
          </React.Fragment>
        </Paper>
      )}
    </>
  );
}

export default BookingDetailsTab;
