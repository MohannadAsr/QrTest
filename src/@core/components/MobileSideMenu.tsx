import { RootState } from '@src/store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiIcon from './MuiIcon';
import { Card, IconButton, Paper } from '@mui/material';
import { switchMobileMenu } from '@src/actions/App/AppSlice';
// import DashSideMenu from './DashSideMenu';

function MobileSideMenu() {
  const { MobileMenu } = useSelector((state: RootState) => state.App);
  const dispatch = useDispatch();
  return (
    <>
      <span className=" xl:hidden block py-2 ">
        <IconButton onClick={() => dispatch(switchMobileMenu(!MobileMenu))}>
          <MuiIcon name="Menu" />
        </IconButton>
      </span>

      <div
        className={` fixed  top-0 ${
          MobileMenu ? 'left-0 ' : '-left-[320px]'
        }  z-[8888] transition-all w-[320px] h-[100vh]`}
      >
        <Paper
          elevation={0}
          className=" flex items-center justify-end relative shadow-lg"
        >
          <IconButton
            onClick={() => dispatch(switchMobileMenu(false))}
            style={{ position: 'absolute', right: 3, top: 3 }}
          >
            <MuiIcon name="Close" />
          </IconButton>
        </Paper>
        {/* <DashSideMenu /> */}
      </div>
    </>
  );
}

export default MobileSideMenu;
