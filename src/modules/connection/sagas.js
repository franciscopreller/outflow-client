import { takeEvery, select, put } from 'redux-saga/effects';
import * as constants from '../session/constants';
import * as actions from '../session/actions';

function* sessionDisconnected(action) {
  try {
    const connection = yield select((state) => state.connections.find(s => s.uuid === action.payload.uuid));
    const messages = [
      `Disconnected from ${connection.name} on: [ ${connection.host}:${connection.port} ]`,
    ];
    yield put(actions.appendSystemMessages(messages, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not add system messages to content', err);
  }
}

function* contentSaga() {
  yield [
    takeEvery(constants.SESSION_DISCONNECTED, sessionDisconnected),
  ];
}

export default contentSaga;
