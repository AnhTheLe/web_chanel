import { ThemeProvider } from '@mui/material';
import useRouteElements from './useRouteElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { storeProvider } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense, useContext, useEffect } from 'react';
import { createAppTheme } from './theme';
import { AppContext, AppProvider } from './contexts/app.context';

function App() {
  const routeElements = useRouteElements();
  const theme = createAppTheme(storeProvider.store.getState().theme);

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Provider store={storeProvider.store}>
          <PersistGate loading={null} persistor={storeProvider.persistor}>
            <Suspense>
              {routeElements}
              <ToastContainer />
            </Suspense>
          </PersistGate>
        </Provider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
