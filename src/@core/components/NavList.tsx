import React from 'react';
import MuiIcon, { MUIIconName } from './MuiIcon';
import { Link, useLocation } from 'react-router-dom';
import { isMobileDevice } from '@src/pages/Events/EventDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store/store';
import { switchMobileMenu } from '@src/actions/App/AppSlice';

export const NavListItems: { name: string; path: string; icon: MUIIconName }[] =
  [
    { name: 'Startseite', path: '/', icon: 'Home' },
    { name: 'Veranstaltungen', path: '/events', icon: 'Event' },
    { name: 'VIPs', path: '/vips', icon: 'PeopleOutlined' },
    { name: 'Produkte & Tabellen', path: '/products', icon: 'Restaurant' },
    { name: 'Rechnungen', path: '/bills', icon: 'Paid' },
    { name: 'Statistiken', path: '/stats', icon: 'Leaderboard' },
    // { name: 'Statistiken', path: 'n', icon: 'QueryStatsOutlined' },
    // { name: 'QR-Scanner', path: '/QRscanner', icon: 'InfoOutlined' },
  ];

function NavList() {
  const { pathname } = useLocation();
  const { MobileMenu } = useSelector((state: RootState) => state.App);
  const dispatch = useDispatch();
  return (
    <>
      {NavListItems.map((item, index) => {
        return (
          <Link
            onClick={() => dispatch(switchMobileMenu(false))}
            to={item.path}
            className={`group ${
              (pathname.startsWith(item.path) && item.path !== '/') ||
              (item.path == '/' && pathname == item.path)
                ? ' bg-success text-primary font-bold'
                : ' bg-secondary text-white'
            }   py-3 px-3  rounded-2xl flex items-center justify-start gap-2 md:text-[10px] lg:text-[15px] cursor-pointer min-w-fit lg:min-w-[120px] hover:bg-success hover:text-primary hover:font-bold`}
            key={index}
          >
            <MuiIcon
              name={item.icon as MUIIconName}
              color={
                (pathname.startsWith(item.path) && item.path !== '/') ||
                (item.path == '/' && pathname == item.path)
                  ? 'primary'
                  : null
              }
              className=" group-hover:-rotate-6 transition-all "
            />
            <p>{item.name}</p>
          </Link>
        );
      })}
      {isMobileDevice() && (
        <Link
          onClick={() => dispatch(switchMobileMenu(false))}
          to={'/QRscanner'}
          className={`group ${
            pathname.startsWith('/QRscanner') || pathname == '/QRscanner'
              ? ' bg-success text-primary font-bold'
              : ' bg-secondary text-white'
          }   py-3 px-3  rounded-2xl flex items-center justify-start gap-2 md:text-[10px] lg:text-[15px] cursor-pointer min-w-fit lg:min-w-[120px] hover:bg-success hover:text-primary hover:font-bold`}
        >
          <MuiIcon
            name="InfoOutlined"
            color={
              pathname.startsWith('/QRscanner') || pathname == '/QRscanner'
                ? 'primary'
                : null
            }
            className=" group-hover:-rotate-6 transition-all"
          />
          <p>Qr Scanner</p>
        </Link>
      )}
    </>
  );
}

export default NavList;
