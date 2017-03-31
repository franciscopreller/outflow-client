import { fork } from 'redux-saga/effects';
import connectionSaga from '../modules/session/sagas';

export default function* rootSaga() {
  yield [
    fork(connectionSaga),
  ];
}
