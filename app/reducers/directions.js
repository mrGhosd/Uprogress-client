const initialState = {
  directions: []
}

export default function directions(state = initialState, action) {
  console.log(action);
  switch(action.type) {
    case 'GET_DIRECTIONS_LIST':
      return Object.assign({}, state, { directions: action.directions });
    default:
      return state;
  }

}
