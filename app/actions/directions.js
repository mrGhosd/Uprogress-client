import { get } from 'utils/ApiRequest';

export function getList() {
  return dispatch => {
    get('/directions').then(response => {
        dispatch({ type: 'GET_DIRECTIONS_LIST', directions: response.data.directions });
    });
  }
}


export function setList(directions) {
  return {
    type: 'SET_DIRECTIONS_LIST',
    directions
  };
}
