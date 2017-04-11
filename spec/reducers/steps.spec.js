import reducer from 'reducers/steps';
import expect from 'expect';

describe('Steps reducers', () => {
  describe('DIRECTION', () => {
    it('return updated steps list key', () => {
      const list = { steps: [{ id: 1 }, { id: 2 }] };

      expect(
        reducer([], { type: 'DIRECTION', direction: list })
      ).toEqual({ list: list.steps, edit: {} });
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
    it('return updated steps list, edit and errors key', () => {
      const step = { title: 'Step', description: 'Step' };
      const defaultState = { list: [step] };

      expect(
        reducer(defaultState, { type: 'UPDATE_STEP', step })
      ).toEqual({ list: [step], errors: {}, edit: {} });
    });
  });

  describe('DELETE_STEP', () => {
    it('return updated steps list key', () => {
      const step = { title: 'Step', description: 'Step' };
      const defaultState = { list: [step] };

      expect(
        reducer(defaultState, { type: 'DELETE_STEP', step })
      ).toEqual({ list: [] });
    });
  });

  describe('FAILED_OPERATION', () => {
    it('return updated errors key', () => {
      const errors = { title: 'Error', description: 'Error' };

      expect(
        reducer({}, { type: 'FAILED_OPERATION', errors })
      ).toEqual({ errors });
    });
  });
});
