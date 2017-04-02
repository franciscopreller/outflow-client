import { fork } from 'redux-saga/effects';
import sessionSaga from '../modules/session/sagas';
import connectionSaga from '../modules/connection/sagas';
import contentSaga from '../modules/content/sagas'

export default function* rootSaga() {
  yield [
    fork(sessionSaga),
    fork(connectionSaga),
    fork(contentSaga),
  ];
}
