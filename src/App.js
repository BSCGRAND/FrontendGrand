import React from 'react';
import AppRouter from './routers/AppRouter';
import getAppStore from './store/store';


import { Provider } from 'react-redux';

const store = getAppStore();

export const template = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

