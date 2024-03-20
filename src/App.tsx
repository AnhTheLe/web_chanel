import { ThemeProvider } from '@mui/material';
import useRouteElements from './useRouteElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { storeProvider } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import { createAppTheme } from './theme';

function App() {
  const routeElements = useRouteElements();
  const theme = createAppTheme(storeProvider.store.getState().theme);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={storeProvider.store}>
        <PersistGate loading={null} persistor={storeProvider.persistor}>
          <Suspense>
            {routeElements}
            <ToastContainer />
          </Suspense>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
