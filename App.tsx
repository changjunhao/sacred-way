import {Provider} from 'mobx-react';
import React from 'react';
import RootStack from './app/index';
import Store from './app/Stores';
import TokenStore from './app/Stores/TokenStore';

const App = () => (
  <Provider {...Store} tokenStore={TokenStore}>
    <RootStack />
  </Provider>
);

export default App;
