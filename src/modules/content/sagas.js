import { takeEvery, select, put } from 'redux-saga/effects';
import * as constants from '../session/constants';
import * as actions from '../session/actions';
import * as utils from '../session/utils';

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

function* contentSaga() {
  yield [
    takeEvery(constants.SESSION_OUTPUT, parseRawSessionOutput),
    takeEvery(constants.SESSION_ERROR, appendErrorMsgToContent),
    takeEvery(constants.APPEND_SYSTEM_MSG, appendSystemMsgToContent),
  ];
}

export default contentSaga;
