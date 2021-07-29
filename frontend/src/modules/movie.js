import { createAction, handleActions } from 'redux-actions';

const SAMPLE_ACTION = 'SAMPLE_ACTION';

export const sampleAction = createAction(SAMPLE_ACTION);

const initialState = {};

const movie = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,
  },
  initialState,
);

export default movie;
