import { takeEvery, select, put } from 'redux-saga/effects';
import UUID from 'uuid/v4';
import * as constants from './constants';
import * as actions from './actions';

/**
 * This initial invoker spawns a new UUID and invokes the session initializer
 * @param action
 */
function* openSession(action) {
  try {
    const connection = action.payload.connection;
    const uuid = UUID();

    // Open session
    yield put(actions.initialiseSession(connection, uuid));
  } catch (err) {
    yield console.error('Could not add connection', err);
  }
}

function* initSession(action) {
  try {
    const { connection, uuid } = action.payload;
    const messages = [`Connecting to ${connection.name} on: [ ${connection.host}:${connection.port} ]`];

    yield put(actions.sessionConnect(Object.assign({}, connection, { uuid })));
    yield put(actions.appendSystemMessages(messages, uuid));
  } catch (err) {
    yield console.error('Could not open connection', err);
  }
}

function* sessionSaga() {
  yield [
    takeEvery(constants.SESSION_OPEN, openSession),
    takeEvery(constants.SESSION_INIT, initSession),
  ];
}

export default sessionSaga;
