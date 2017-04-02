import { fork } from 'redux-saga/effects';
import authSaga from '../modules/auth/sagas';
import sessionSaga from '../modules/session/sagas';
import connectionSaga from '../modules/connection/sagas';
import contentSaga from '../modules/content/sagas';

export default function* rootSaga() {
  yield [
    fork(authSaga),
    fork(sessionSaga),
    fork(connectionSaga),
    fork(contentSaga),
  ];
}
