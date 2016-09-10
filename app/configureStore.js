import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  /**
   * Create store with remote-devtools and logger middleware. Do it only
   * in development to reduce performance issues.
   */

  const sagaMiddleware = createSagaMiddleware();

  // eslint-disable-next-line no-undef
  if (__DEV__) {
    // eslint-disable-next-line global-require
    const createLogger = require('redux-logger');
    // eslint-disable-next-line global-require
    const devTools = require('remote-redux-devtools');

    const logger = createLogger();

    const finalCreateStore = compose(
      applyMiddleware(sagaMiddleware, logger),
      devTools()
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
      module.hot.accept('./reducers', () =>
        // eslint-disable-next-line global-require
        store.replaceReducer(require('./reducers').default)
      );
    }

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
  }

  const finalCreateStore = applyMiddleware(sagaMiddleware)(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default)
    );
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
