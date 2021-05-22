import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../utils';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalIncome() {
  const statistic = useSelector(state => state.statistic);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Tổng Thu</Title>
      <Typography component="p" variant="h4">
        {numberWithCommas(statistic.totalIncome)} VNĐ
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        tính đến ngày {new Date().toLocaleDateString('vi-VN')}
      </Typography>
    </React.Fragment>
  );
}
