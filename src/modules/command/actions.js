import { COMMAND_SET_HISTORY } from '../session/constants';

export function setHistory(command, uuid) {
  return {
    type: COMMAND_SET_HISTORY,
    payload: {
      command,
      uuid,
    },
  };
}