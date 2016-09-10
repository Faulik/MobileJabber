import React, { Component, PropTypes } from 'react';
import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';

import rootSaga from './sagas';
import createScenes from './scenes';

class Root extends Component {
  render() {
    const { store } = this.props;

    const scenes = createScenes(store);

    store.runSaga(rootSaga);
    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
