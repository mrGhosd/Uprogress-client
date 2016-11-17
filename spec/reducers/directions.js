import reducer from 'reducers/directions';
import expect from 'expect';

const initialState = {
  list: [],
  detail: {
    steps: []
  },
  errors: {},
  isUpdated: null,
  isCreated: null
};

describe('Directions reducer', () => {
  describe('Initial state', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });

  // EXAMPLE SPEC
  describe('GET_DIRECTIONS_LIST action', () => {
    it('return updated list key', () => {
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }];

      initialState.list = list;
      expect(
        reducer([], { type: 'GET_DIRECTIONS_LIST', directions: list })
      ).toEqual({ list });

    });
  });
});
