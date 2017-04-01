import { takeEvery, select, put } from 'redux-saga/effects';
import UUID from 'uuid/v4';
import * as constants from './constants';
import * as actions from './actions';
import * as utils from './utils';

function* addConnectionSession(action) {
  try {
    const connection = action.payload.connection;
    const index = yield select((state) => state.session.connections.length - 1);
    const uuid = UUID();

    // Open session
    yield put(actions.openSession(index, uuid));
    const messages = [
      `Connecting to ${connection.name} on: [ ${connection.host}:${connection.port} ]`,
    ];

    // Send system messages
    yield put(actions.appendSystemMessages(messages, uuid));
  } catch (err) {
    yield console.error('Could not add connection', err);
  }
}

function* openConnectionSession(action) {
  try {
    const connection = yield select((state) => state.session.connections[action.payload.index]);
    yield put(actions.openConnection(connection));
  } catch (err) {
    yield console.error('Could not open connection', err);
  }
}

function* closeConnectionSession(action) {
  try {
    const connection = yield select((state) => state.session.connections[action.payload.index]);
    yield put(actions.removeSession(connection));
  } catch (err) {
    yield console.error('Could not close connection', err);
  }
}

function* removeConnectionSession(action) {
  try {
    const connection = action.payload.connection;
    yield console.log('Connection removed', connection);
  } catch (err) {
    yield console.error('Could not open connection', err);
  }
}

function* parseRawSessionOutput(action) {
  try {
    yield put(actions.appendContent(utils.parseLines(action.payload.lines), action.payload.uuid));
  } catch (err) {
    yield console.error('Could not parse raw content', err);
  }
}

function* appendSystemMsgToContent(action) {
  try {
    const messages = action.payload.messages;
    const lines = messages.map((message) => (
      `<span style="color: greenyellow">%%% ${message}</span>`
    ));
    yield put(actions.appendContent(lines, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not add system messages to content', err);
  }
}

function* appendErrorMsgToContent(action) {
  try {
    const error = action.payload.error;
    const lines = [(
      `<span style="color: red">%%% ${error}</span>`
    )];
    yield put(actions.appendContent(lines, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not add system messages to content', err);
  }
}

function* sessionDisconnected(action) {
  try {
    const connection = yield select((state) => state.session.connections.find(s => s.uuid === action.payload.uuid));
    const messages = [
      `Disconnected from ${connection.name} on: [ ${connection.host}:${connection.port} ]`,
    ];
    yield put(actions.appendSystemMessages(messages, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not add system messages to content', err);
  }
}

function* connectionSaga() {
  yield [
    takeEvery(constants.ADD_SESSION, addConnectionSession),
    takeEvery(constants.IDENTIFY_SESSION, openConnectionSession),
    takeEvery(constants.CLOSE_SESSION, closeConnectionSession),
    takeEvery(constants.REMOVE_SESSION, removeConnectionSession),
    takeEvery(constants.SESSION_OUTPUT, parseRawSessionOutput),
    takeEvery(constants.SESSION_ERROR, appendErrorMsgToContent),
    takeEvery(constants.SESSION_DISCONNECTED, sessionDisconnected),
    takeEvery(constants.APPEND_SYSTEM_MSG, appendSystemMsgToContent),
  ];
}

export default connectionSaga;
