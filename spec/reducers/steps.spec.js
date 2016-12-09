import reducer from 'reducers/steps';
import expect from 'expect';

const initialState = {
  list: [],
  errors: {},
  edit: {}
};

describe('Steps reducers', () => {
  describe('DIRECTION', () => {
    it('return updated steps list key', () => {
      const list = { steps: [{ id: 1 }, { id: 2 }] };

      expect(
        reducer([], { type: 'DIRECTION', direction: list })
      ).toEqual({ list: list.steps });
    });
  });

  describe('EDIT_STEP', () => {
    it('return updated steps edit key', () => {
      const step = { title: 'Step', description: 'Step' };

      expect(
        reducer({}, { type: 'EDIT_STEP', step })
      ).toEqual({ edit: step });
    });
  });

  describe('CREATE_STEP', () => {
    it('return updated steps list and errors key', () => {
      const defaultState = { list: [] };
      const step = { title: 'Step', description: 'Step' };

      expect(
        reducer(defaultState, { type: 'CREATE_STEP', step })
      ).toEqual({ list: [step], errors: {} });
    });
  });

  describe('UPDATE_STEP', () => {

  });

  describe('DELETE_STEP', () => {

  });

  describe('FAILED_OPERATION', () => {

  });
});
