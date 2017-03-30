import update from 'react/lib/update';

const initialState = {
  isShow: false
};

/**
 * Select action due to action.type parameter
 * @param  {Object} state Application state
 * @param  {Object} action Action object
 * @return {Object} Updated state
 */
 /*eslint-disable */
export default function(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION_MENU':
      const toggleValue = state.isShow;

      return update(state, {
        isShow: { $set: !toggleValue }
      })

      case 'SET_NAVIGATION_MENU':
        return update(state, {
          isShow: { $set: action.show }
        })
    default:
      return state;
  }
}
/*eslint-enable */
