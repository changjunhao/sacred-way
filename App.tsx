import {Provider} from 'mobx-react';
import React from 'react';
import RootStack from './app/index';
import Store from './app/Stores';
import TokenStore from './app/Stores/TokenStore';

export default function App() {
  return (
    <Provider {...Store} tokenStore={TokenStore}>
      <RootStack />
    </Provider>
  );
}
