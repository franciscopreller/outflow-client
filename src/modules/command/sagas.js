import { takeEvery, put, select } from 'redux-saga/effects';
import * as constants from '../session/constants';
import { sendCommand } from '../session/actions';
import * as actions from './actions';

// @TODO: Move to configuration
const MIN_LENGTH_COMMAND_HISTORY = 3;

function* processCommandActions(action) {
  let command = action.payload.command;
  try {
    // Adding to history logic
    if (!action.payload.hidden && command.length >= MIN_LENGTH_COMMAND_HISTORY) {
      console.log('Met initial history criteria', { command, length: command.length });
      // If the last item in the command list is identical, ignore it
      const history = yield select((state) => state.command.filter((cmd) => cmd.uuid === action.payload.uuid));
      console.log('Git history');
      if (history.length === 0 || (history.length && history[history.length - 1] !== command)) {
        console.log('Setting command in history');
        yield put(actions.setHistory(command, action.payload.uuid));
      }
    }
    yield put(sendCommand(command, action.payload.uuid, action.payload.hidden));
  } catch (err) {
    yield console.log('Command got error', err);
  }
}

function* contentSaga() {
  yield [
    takeEvery(constants.COMMAND_PRE_PROCESS, processCommandActions),
  ];
}

export default contentSaga;
