import update from 'react/lib/update';

const initialState = {
  list: [],
  detail: {}
}

export default function (state = initialState, action) {
  switch(action.type) {
    case 'GET_DIRECTIONS_LIST':
      return { ...state, list: action.directions }
    case 'DIRECTION':
      return { ...state, detail: action.direction }
    case 'NEW_DIRECTION':
      return update(state, {list: {$push: [action.direction]}});
    case 'UPDATE_DIRECTION':
      console.log(action);
      return { ...state, detail: action.direction, isUpdated: action.updated }
    default:
      return state;
  }

}
