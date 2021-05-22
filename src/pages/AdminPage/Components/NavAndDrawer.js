import React, { useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  Avatar,
  ClickAwayListener,
  Collapse,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory, useRouteMatch } from 'react-router';
import {
  Assessment,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from '@material-ui/icons';
import useStyles from '../../../hooks/useStyles';

export default function NavAndDrawer(props) {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const history = useHistory();

  const [openDrawer, setOpenDrawer] = useState(true);
  const [openReserveList, setOpenReserveList] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setOpenReserveList(false);
  };

  const user = useSelector(state => state.firebase.auth);

  const [openContext, setOpenContext] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleToggleContext = () => {
    setOpenContext(!openContext);
  };

  const handleCloseContext = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenContext(false);
  };
  const handleSignOut = () => {
    auth.signOut().then(() => {
      localStorage.setItem('user', JSON.stringify(null));
      window.location.reload(false);
    });
  };

  const onClickReservation = () => {
    setOpenReserveList(!openReserveList);
  };

  const MainListItems = () => (
    <div>
      <ListItem button onClick={() => history.push(`${url}`)}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Trang Chủ" />
      </ListItem>

      <ListItem button onClick={onClickReservation}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Khách" />
        {openReserveList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openReserveList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            onClick={() => history.push(`${url}/reserve`)}
            button
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Đặt Phòng" />
          </ListItem>
          <ListItem
            onClick={() => history.push(`${url}/checkInAndOut`)}
            button
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="CheckIn CheckOut" />
          </ListItem>
          <ListItem
            onClick={() => history.push(`${url}/allBooking`)}
            button
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Dữ Liệu" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={() => history.push(`${url}/statistic`)}>
        <ListItemIcon>
          <Assessment />
        </ListItemIcon>
        <ListItemText primary="Thống Kê" />
      </ListItem>
      <ListItem button onClick={() => history.push(`${url}/manage-rooms`)}>
        <ListItemIcon>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary="Quản Lý Phòng Nghỉ" />
      </ListItem>
      {/* <ListItem button onClick={() => history.push(`${url}/manage-staffs`)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Quản Lý Nhân Viên" />
      </ListItem> */}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {user.displayName}
          </Typography>
          <IconButton
            ref={anchorRef}
            aria-controls={openContext ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggleContext}
            color="inherit"
          >
            <Avatar src={user?.photoURL} />
          </IconButton>
          <Popper
            open={openContext}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseContext}>
                    <MenuList autoFocusItem={openContext} id="menu-list-grow">
                      <MenuItem disabled={true}>{user.displayName}</MenuItem>
                      <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openDrawer && classes.drawerPaperClose,
          ),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
}
