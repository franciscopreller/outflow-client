import { takeEvery, select, put } from 'redux-saga/effects';
import UUID from 'uuid/v4';
import * as constants from './constants';
import * as actions from './actions';

function* addConnection(action) {
  try {
    const connection = action.payload.connection;
    const index = yield select((state) => state.connection.connections.length - 1);
    const uuid = UUID();
    yield put(actions.openConnection(index, uuid));
    yield console.log(`Connection added at index ${index}`, connection);
  } catch (err) {
    yield console.log('Could not add connection', err);
  }
}

function* openConnection(action) {
  try {
    const connection = yield select((state) => state.connection.connections[action.payload.index]);
    yield console.log('Opening connection', connection);
  } catch (err) {
    yield console.log('Could not open connection', err);
  }
}

function* closeConnection(action) {
  try {
    const connection = yield select((state) => state.connection.connections[action.payload.index]);
    yield console.log('Closing connection', connection);
    yield put(actions.removeConnection(connection));
  } catch (err) {
    yield console.log('Could not close connection', err);
  }
}

function* removeConnection(action) {
  try {
    const connection = action.payload.connection;
    yield console.log('Connection removed', connection);
  } catch (err) {
    yield console.log('Could not open connection', err);
  }
}

function* connectionSaga() {
  yield [
    takeEvery(constants.ADD_CONNECTION, addConnection),
    takeEvery(constants.OPEN_CONNECTION, openConnection),
    takeEvery(constants.CLOSE_CONNECTION, closeConnection),
    takeEvery(constants.REMOVE_CONNECTION, removeConnection),
  ];
}

export default connectionSaga;
