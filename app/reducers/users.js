const initialState = {
  signed: false,
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
      localStorage.setItem('uprogresstoken', action.token)
      return { ...state, signed: true }
    case 'SIGN_UP_USER':
      localStorage.setItem('uprogresstoken', action.token)
      return { ...state, signed: true }
    default:
      return state;
  }
}
/*eslint-enable */
