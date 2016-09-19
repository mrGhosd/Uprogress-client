const initialState = {
  current: {}
};

/**
 * Select action due to action.type parameter
 * @param  {Object} state Application state
 * @param  {Object} action Action object
 * @return {Object} Updated state
 */
 /*eslint-disable */
export default function(state = initialState, action) {
  switch(action.type) {
    case 'SIGN_IN_USER':
      return { ...state, current: action.user }
    case 'SIGN_UP_USER':
      return { ...state, current: action.user }
    default:
      return state;
  }
}
/*eslint-enable */
