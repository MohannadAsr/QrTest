import React from 'react';
import { useLocation } from 'react-router-dom';
import DeleteContainer from './@core/shared/DeleteDialog/DeleteContainer';
import ToastContainer from './@core/shared/Toast/ToastContainer';
import DashNavigation from './@core/Navigation/DashNavigation';
import DashThemeProvider from './@core/Providers/DashThemeProvider';

function App() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <div className="relative ">
        <DeleteContainer />
        <ToastContainer />
        <DashNavigation />
      </div>
    </>
  );
}

export default App;
