import { createTheme } from '@mui/material/styles';
import MuiLocalizationProvider from '@src/@core/Providers/MuiLocalizationProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import i18n from './plugins/i18n.ts'; // Import your i18n instance
import store from './store/store.ts';
import './styles/global.scss';
import { AppLoading } from './@core/components/AppLoading.tsx';
import DashThemeProvider from './@core/Providers/DashThemeProvider.tsx';

export const queryClient = new QueryClient();

// import App from './App.tsx';
const App = React.lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MuiLocalizationProvider>
      <Provider store={store}>
        <DashThemeProvider>
          <React.Suspense fallback={<AppLoading />}>
            <I18nextProvider i18n={i18n}>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </I18nextProvider>
          </React.Suspense>
        </DashThemeProvider>
      </Provider>
    </MuiLocalizationProvider>
  </BrowserRouter>
);
