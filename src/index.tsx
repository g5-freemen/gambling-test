import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import store from './commons/redux/store';
import './index.css';

const queryClient = new QueryClient();
const container = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
);
