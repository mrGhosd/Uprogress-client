import { get, post } from 'utils/ApiRequest';

export function getList() {
  return dispatch => {
    get('/directions').then(response => {
        dispatch({ type: 'GET_DIRECTIONS_LIST', directions: response.data.directions });
    });
  }
}

export function createDirection(direction) {
  return dispatch => {
    post('/directions', { direction })
      .then(response => {
        console.log(response);
        dispatch({ type: 'NEW_DIRECTION', direction: response.data.direction });
      });
  }
}

export function getDirection(id) {
  return dispatch => {
    get(`/directions/${id}`)
      .then(response => {
        dispatch({ type: 'DIRECTION', direction: response.data.direction });
      });
  }
}


export function setList(directions) {
  return {
    type: 'SET_DIRECTIONS_LIST',
    directions
  };
}
