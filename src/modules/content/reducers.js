import {
  SESSION_CLOSE,
  SESSION_INIT,
  APPEND_CONTENT,
  APPEND_COMMAND,
  SESSION_DO_GO_AHEAD,
} from '../session/constants';

// Initial State
const initialState = [];

// Handlers
const ACTION_HANDLERS = {
  [SESSION_INIT]: (state, action) => [
    ...state, {
      uuid: action.payload.uuid,
      segments: [],
      eor: false,
    }
  ],
  [SESSION_CLOSE]: (state, action) => [
    ...state.filter((content) => content.uuid !== action.payload.uuid),
  ],
  [APPEND_CONTENT]: (state, action) => state.map((c) => {
    if (c.uuid !== action.payload.uuid) return c;
    let segments = [ ...c.segments ];
    let payloadSegments = [...action.payload.segments];

    // If EOR is true, we should move the last line from contentSegments to after the payloadSegments,
    // just in case the last line is a command, don't match it...


    // @TODO: Had to comment out prompt logic due to bugs, will come back to fix later
    // if (c.eor && segments.length) {
    //   let lastPromptSegments = [];
    //   let index = segments.length - 1;
    //   let lookFor = 'start';
    //   let indexesToRemove = [];
    //   let collect = false;
    //   for (; index >= 0; index--) {
    //     console.log(`Checking segment #${index} for .at-prompt-x`, { segment: segments[index]});
    //     if (collect || segments[index] && segments[index].classes && segments[index].classes.includes(`at-prompt-${lookFor}`)) {
    //       // Set collection
    //       collect = true;
    //       // Add segment to part of the prompt segments and assign the index to be removed later
    //       lastPromptSegments = [ ...lastPromptSegments, Object.assign({}, segments[index]) ];
    //       indexesToRemove = [ ...indexesToRemove, index ];
    //       lookFor = 'end';
    //       // Check if current prompt also has 'end' and break if we do
    //       if (segments[index].classes.includes(`at-prompt-${lookFor}`)) break;
    //     }
    //   }
    //
    //   console.log('Got prompt segments:', { lastPromptSegments, segments });
    //   segments = segments.filter((s, i) => (!indexesToRemove.includes(i)));
    //   payloadSegments = [...payloadSegments, ...lastPromptSegments];
    // }
    return Object.assign({}, c, {
      segments: [
        ...segments,
        ...payloadSegments,
      ],
    });
  }),
  [APPEND_COMMAND]: (state, action) => state.map((content) => (
    (content.uuid !== action.payload.uuid) ? content : Object.assign({}, content, {
      eor: false, // After sending command send EOR to true
      segments: [
        ...content.segments,
        ...action.payload.segments,
      ],
    })
  )),
  [SESSION_DO_GO_AHEAD]: (state, action) => state.map((s) => (
    (s.uuid !== action.payload.uuid) ? s : Object.assign({}, s, { eor: true })
  )),
};

// Expose reducer
export default function contentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
