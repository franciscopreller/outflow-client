import { takeEvery, select, put } from 'redux-saga/effects';
import { WS_CONNECTED } from '../ws/constants';
import * as actions from './actions';

function* identifyWS() {
  try {
    const uuid = yield select((state) => state.auth.uuid);
    yield put(actions.updateWebsocketAuth(`#${uuid}`));
  } catch (err) {
    yield console.error('Could not identify to web socket')
  }
}

function* authSaga() {
  yield [
    takeEvery(WS_CONNECTED, identifyWS),
  ];
}

export default authSaga;
