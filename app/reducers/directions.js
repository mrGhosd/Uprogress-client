const initialState = {
  list: []
}

export default function directions(state = initialState, action) {
  switch(action.type) {
    case 'GET_DIRECTIONS_LIST':
      return { ...state, list: action.directions }
    default:
      return state;
  }

}
