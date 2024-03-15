import { createSlice } from '@reduxjs/toolkit';
import {
  ModeSwitch,
  switchAlert,
  switchDialog,
  switchMenu,
} from '@src/actions/App/AppActions';

export class AppReducerState {
  mode: 'dark' | 'light' = 'light';
  authDialog: boolean = false;
  showDeleteAlert: boolean = false;
  MobileMenu: boolean = false;
}

const initialState: AppReducerState = { ...new AppReducerState() };

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    switchMode: ModeSwitch,
    switchAuthDialog: switchDialog,
    switchDeleteAlert: switchAlert,
    switchMobileMenu: switchMenu,
  },
});

export const {
  switchMode,
  switchAuthDialog,
  switchDeleteAlert,
  switchMobileMenu,
} = AppSlice.actions;
export default AppSlice.reducer;
