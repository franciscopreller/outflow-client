import { delay } from 'redux-saga';
import { call, takeEvery, take, select, put } from 'redux-saga/effects';
import { WS_CONNECTED } from '../ws/constants';
import * as constants from './constants';
import * as actions from './actions';

function* webSocketUpdate() {
  try {
    yield call(delay, 300 * 1000);
    const uuid = yield select((state) => state.auth.uuid);
    yield put(actions.updateWebsocketAuth(`#${uuid}`));
  } catch (err) {
    yield console.error('Could not update web socket');
  }
}

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
    takeEvery(constants.AUTH_WS_UPDATE, webSocketUpdate),
  ];
}

export default authSaga;
