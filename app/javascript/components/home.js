import React from 'react'
import ReactDOM from 'react-dom/client'
import NpiPage from './pages/NpiPage'
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient();

function home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NpiPage />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default home;