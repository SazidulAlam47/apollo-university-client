import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import '@ant-design/v5-patch-for-react-19';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
        <Toaster />
    </StrictMode>,
);
