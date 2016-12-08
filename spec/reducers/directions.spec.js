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

  describe('GET_DIRECTIONS_LIST action', () => {
    it('return updated list key', () => {
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }];

      // initialState.list = list;
      expect(
        reducer([], { type: 'GET_DIRECTIONS_LIST', directions: list })
      ).toEqual({ list });

    });
  });

  describe('DIRECTION', () => {
    it('return updated detail key', () => {
      const detail = { id: 1, title: 'title', description: 'description' };

      // initialState.detail = detail;
      expect(
        reducer([], { type: 'DIRECTION', direction: detail })
      ).toEqual({ detail });
    });
  });

  describe('DIRECTION_FAILED', () => {
    it('return updated direction_failed key', () => {
      const errors = { title: 'Error', description: 'Error' };

      // initialState.errors = errors;
      // initialState.isUpdated = false;
      // initialState.isCreated = false;
      expect(
        reducer({}, { type: 'DIRECTION_FAILED', errors })
      ).toEqual({ errors, isCreated: false, isUpdated: false });
    });
  });

  describe('NEW_DIRECTION', () => {
    it('return updated detailed, isCreated and list key', () => {
      const defaultState = { list: [] };
      const direction = { id: 1, title: 'Title', description: 'Desc' };

      expect(
        reducer(defaultState, { type: 'NEW_DIRECTION', direction, created: true })
      ).toEqual({ detail: direction, list: [direction], isCreated: true });
    });
  });

  describe('UPDATE_DIRECTION', () => {
    it('return updated detailed, isUpdated and list key', () => {
      const defaultState = { list: [{ id: 1, title: 'Title', description: 'Desc' }] };
      const direction = { id: 1, title: 'Title1', description: 'Desc1' };

      expect(
        reducer(defaultState, { type: 'UPDATE_DIRECTION', direction, updated: true })
      ).toEqual({ detail: direction, list: [direction], isUpdated: true });
    });
  });

  describe('UPDATE_STEP', () => {
    it('return updated detailed and list key', () => {
      const defaultState = { list: [{ id: 1, title: 'Title', description: 'Desc' }] };
      const step = { direction: { id: 1, title: 'Title1', description: 'Desc1' }};

      expect(
        reducer(defaultState, { type: 'UPDATE_STEP', step })
      ).toEqual({ detail: step.direction, list: [step.direction] });
    });
  });

  describe('CREATE_STEP', () => {
    it('return updated detailed and list key', () => {
      const defaultState = { list: [{ id: 1, title: 'Title', description: 'Desc' }] };
      const step = { direction: { id: 1, title: 'Title1', description: 'Desc1' }};

      expect(
        reducer(defaultState, { type: 'CREATE_STEP', step })
      ).toEqual({ detail: step.direction, list: [step.direction] });
    });
  });

  describe('DELETE_STEP', () => {
    it('return updated detailed and list key', () => {
      const defaultState = { list: [{ id: 1, title: 'Title', description: 'Desc' }] };
      const step = { direction: { id: 1, title: 'Title1', description: 'Desc1' }};

      expect(
        reducer(defaultState, { type: 'DELETE_STEP', step })
      ).toEqual({ detail: step.direction, list: [step.direction] });
    });
  });

  describe('USER_INFO', () => {
    it('return updated list key', () => {
      const user = { directions: [{ id: 1, title: 'Title1', description: 'Desc1' }]};

      expect(
        reducer({}, { type: 'USER_INFO', user })
      ).toEqual({ list: user.directions });
    });
  });

  describe('REMOVE_FORM_ERRORS', () => {

  });
});
