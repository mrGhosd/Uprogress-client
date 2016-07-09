export function getList() {
  return dispatch => {
    dispatch({ type: 'GET_DIRECTIONS_LIST', directions: [{title: 1}] });
  }
}


export function setList(directions) {
  return {
    type: 'SET_DIRECTIONS_LIST',
    directions
  };
}
