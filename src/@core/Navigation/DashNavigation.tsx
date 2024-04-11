import Home from '@src/pages';
import Error404 from '@src/pages/404';
import Signin from '@src/pages/Signin';
import React, { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLoading } from '../components/AppLoading';
import { MUIIconName } from '../components/MuiIcon';
import DashLayout from '../layouts/DashLayout';
import Vips from '@src/pages/Vips';
import Events from '@src/pages/Events/Events';
import CreateEvents from '@src/pages/Events/CreateEvent';
import EventDetails from '@src/pages/Events/EventDetails';
import EventAccess from '@src/pages/EventAccess';
import QrScanner from '@src/pages/QrScanner';
import ProductPage from '@src/pages/Products';
import Bills from '@src/pages/Bills';

export class DashNaviagtionProps {
  name: string = '';
  path: string = '';
  component: ReactNode;
  children?: DashNaviagtionProps[] | null = null;
  icon: MUIIconName | null = null;
  rules?: string[] | null = null;
  layout?: 'blank' | 'standard' = 'standard';
}

export class DashTitleProps {
  title: string = '';
}

export const NavigationRoutes: (DashNaviagtionProps | DashTitleProps)[] = [
  {
    name: 'vips',
    path: '/vips',
    component: <Vips />,
    icon: null,
  },
  {
    name: 'vips',
    path: '/products',
    component: <ProductPage />,
    icon: null,
  },
  {
    name: 'events',
    path: '/events',
    component: <Events />,
    icon: null,
  },
  {
    name: 'events',
    path: '/QRscanner',
    component: <QrScanner />,
    icon: null,
  },
  {
    name: 'eventsCreate',
    path: '/events/create',
    component: <CreateEvents />,
    icon: null,
  },
  {
    name: 'event-Invite',
    path: '/eventaccess/:id',
    component: <EventAccess />,
    icon: null,
    layout: 'blank',
  },
  {
    name: 'eventById',
    path: '/events/:id',
    component: <EventDetails />,
    icon: null,
  },
  {
    name: 'bills',
    path: '/bills',
    component: <Bills />,
    icon: null,
  },
];

function DashNavigation() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <DashLayout>
              <Home />
            </DashLayout>
          }
        />
        <Route
          path="/signin"
          element={
            <DashLayout type="blank">
              <Signin />
            </DashLayout>
          }
        />
        {NavigationRoutes.map((item, index) => {
          if ('path' in item)
            return (
              <Route
                key={item.path}
                element={
                  <DashLayout type={item.layout}>{item.component}</DashLayout>
                }
                path={item.path}
              />
            );
        })}
        <Route
          path="*"
          element={
            <DashLayout type="blank">
              <Error404 />
            </DashLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default DashNavigation;
