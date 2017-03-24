import { fork } from 'redux-saga/effects';
import connectionSaga from '../modules/connection/sagas';

export default function* rootSaga() {
  yield [
    fork(connectionSaga),
  ];
}
