const initialState = {
  directions: []
}

export default function directions(state = initialState, action) {
  switch(action.type) {
    case 'GET_DIRECTIONS_LIST':
    console.log(action.directions);
      // state.directions = action.directions;
      return { ...state, list: action.directions }
    default:
      return state;
  }

}
