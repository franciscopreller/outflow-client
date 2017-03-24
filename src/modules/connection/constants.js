import { WS_PREFIX } from '../../middleware/ws/constants';

export const ADD_SESSION = 'ADD_CONNECTION';
export const IDENTIFY_SESSION = `OPEN_CONNECTION`;
export const CLOSE_SESSION = 'CLOSE_CONNECTION';
export const REMOVE_SESSION = 'REMOVE_CONNECTION';

// Websocket actions
export const OPEN_CONNECTION = `${WS_PREFIX}/open.connection`;