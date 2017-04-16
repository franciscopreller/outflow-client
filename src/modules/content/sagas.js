import { takeEvery, put } from 'redux-saga/effects';
import * as constants from '../session/constants';
import * as actions from '../session/actions';

function* parseRawSessionOutput(action) {
  try {
    yield put(actions.appendContent(action.payload.segments, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not parse raw content', err);
  }
}

function* appendSystemMsgToContent(action) {
  try {
    const messages = action.payload.messages;
    const segments = [{ classes: ['fg-cyan', 'cmd'], text: `%%% ${messages.join('\n')}\n` }];
    yield put(actions.appendCommand(segments, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not add system messages to content', err);
  }
}

function* appendErrorMsgToContent(action) {
  try {
    const error = action.payload.error;
    const segments = [{ classes: ['fg-red', 'cmd'], text: `%%% ${error}\n` }];
    yield put(actions.appendCommand(segments, action.payload.uuid));
  } catch (err) {
    yield console.error('Could not add system messages to content', err);
  }
}

function* appendCommandToContent(action) {
  try {
    const { hidden } = action.payload;
    if (!hidden) {
      const command = `${action.payload.command}\n`;
      const segments = [{classes: ['fg-yellow', 'at-bold', 'cmd'], text: command}];
      yield put(actions.appendCommand(segments, action.payload.uuid));
    }
  } catch (err) {
    yield console.error('Could not append command to terminal', err);
  }
}

function* contentSaga() {
  yield [
    takeEvery(constants.SESSION_OUTPUT, parseRawSessionOutput),
    takeEvery(constants.SESSION_ERROR, appendErrorMsgToContent),
    takeEvery(constants.SESSION_COMMAND, appendCommandToContent),
    takeEvery(constants.APPEND_SYSTEM_MSG, appendSystemMsgToContent),
  ];
}

export default contentSaga;
