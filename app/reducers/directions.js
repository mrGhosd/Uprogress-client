import { update } from 'react/lib';

const initialState = {
  list: []
}

export default function directions(state = initialState, action) {
  switch(action.type) {
    case 'GET_DIRECTIONS_LIST':
      return { ...state, list: action.directions }
    case 'NEW_DIRECTION':
      return update(state, {list: {$push: [action.direction]}});
    default:
      return state;
  }

}
