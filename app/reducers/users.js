import update from 'react/lib/update';

const initialState = {
  current: {},
  show: {},
  signInErrors: {},
  signUpErrors: {},
  userFormErrors: {},
  authorizations: []
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
      return { ...state, signInErrors: {} }
    case 'SIGN_IN_FAILED':
      return { ...state, signInErrors: action.errors }
    case 'SIGN_UP_USER':
      localStorage.setItem('uprogresstoken', action.token)
      return { ...state, signUpErrors: {} }
    case 'SIGN_UP_FAILED':
      return { ...state, signUpErrors: action.errors }
    case 'CURRENT_USER':
      return { ...state, current: action.current };
    case 'USER_UPLOAD_AVATAR':
      return update(state, {
        current: { attachment: { $set: action.attachment } }
      });
    case 'USER_INFO':
      return { ...state, show: action.user };
      case 'USER_INFO_FAILED':
        return update(state, {
          show: { $set: {} }
        });
    case 'SIGN_OUT':
      localStorage.removeItem('uprogresstoken');
      return { ...state, current: {} };
    case 'AUTHORIZATIONS_LIST':
      console.log(action.authorizations);
      return update(state, {
        authorizations: { $set: action.authorizations }
      });
    case 'REMOVE_AUTHORIZATIONS':
      return update(state, {
        authorizations: { $set: [] }
      });
    case 'USER_STATISTICS_SUCCESS':
      return update(state, { show: { statistics: { $set: action.statistics } } });
    default:
      return state;
  }
}
/*eslint-enable */
