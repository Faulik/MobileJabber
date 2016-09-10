/* eslint-disable no-constant-condition */

import { take, put, call, fork, select } from 'redux-saga/effects';
import { jabber, local } from '../services';
import * as actions from '../actions';
// import { getUserId, getCurrentRoom } from '../reducers/selectors';

const {
  room,
} = actions;

// Subroutines

function* connectWithJid(jid, password) {
  yield put(room.request());
  const { response, error } = yield call(jabber.connect, jid, password);
  if (response) {
    yield put(room.success(response));
  } else {
    yield put(room.failure(error));
  }
  return { response, error };
}

//  Watchers

function* watchConnectWithJid() {
  while (true) {
    yield take(actions.CONNECT_WITH_JID);
    yield call(connectWithJid);
  }
}

export default function* rootSaga() {
  yield [
    fork(watchConnectWithJid),
  ];
}
