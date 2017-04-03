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

function* appendCommandToContent(action) {
  try {
    const { hidden } = action.payload;
    const lines = yield select((state) => state.content.find(c => c.uuid === action.payload.uuid).lines);
    const lastLine = lines[lines.length - 1];
    // Since every line is in a span, we get the last character from the string, minus the 7 characters for </span>
    const lastChar = lastLine.substr(lastLine.length - 8).charAt(0);
    const command = `<span style="color: yellow">${(hidden) ? '************' : action.payload.command}</span>`;
    console.log({ lastChar, lastLine, empty: lastChar.trim().length });
    if (lastChar.trim().length === 0) {
      yield put(actions.appendSameLineContent(command, action.payload.uuid));
    } else {
      yield put(actions.appendContent([command], action.payload.uuid));
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
