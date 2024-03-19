import { RootState } from '@src/store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiIcon from './MuiIcon';
import { Card, Drawer, IconButton, Paper } from '@mui/material';
import { switchMobileMenu } from '@src/actions/App/AppSlice';
import DashSideMenu from './DashSideMenu';

function MobileSideMenu() {
  const { MobileMenu } = useSelector((state: RootState) => state.App);
  const dispatch = useDispatch();
  return (
    <>
      <span className=" md:hidden block  ">
        <IconButton onClick={() => dispatch(switchMobileMenu(!MobileMenu))}>
          <MuiIcon name="Menu" className=" text-white" color="inherit" />
        </IconButton>
      </span>

      <Drawer open={MobileMenu}>
        <div className=" flex items-center justify-end relative shadow-lg z-[9990] w-[290px] bg-primary">
          <IconButton
            onClick={() => dispatch(switchMobileMenu(false))}
            style={{ position: 'absolute', right: 3, top: 3 }}
          >
            <MuiIcon name="Close" />
          </IconButton>
        </div>
        <DashSideMenu />
      </Drawer>
    </>
  );
}

export default MobileSideMenu;
