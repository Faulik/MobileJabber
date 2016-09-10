import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import { local } from './services';
import Chat from './scenes/Chat';
import Login from './scenes/Login';

export default (store) => {
  return Actions.create(
    <Scene
      key="root"
    >
      <Scene key="login" component={Login} title="Login" initial hideNavBar />
      <Scene key="chat1" component={Chat} title="Chat1" />
      <Scene key="chat2" component={Chat} title="Chat2" />
    </Scene>
  );
};
