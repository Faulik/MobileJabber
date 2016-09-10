import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

// require('browser-builtins');

import './app/utils/addBuffer';

import Root from './app';
import configureStore from './app/configureStore';

export const store = configureStore();

class MobileJabber extends Component {
  render() {
    return <Root store={store} />
  }
}

AppRegistry.registerComponent('MobileJabber', () => MobileJabber);
