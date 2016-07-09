export function getList(directions) {
  return {
    type: 'GET_DIRECTIONS_LIST',
    directions: []
  }
}


export function setList(directions) {
  return {
    type: 'SET_DIRECTIONS_LIST',
    directions
  };
}
