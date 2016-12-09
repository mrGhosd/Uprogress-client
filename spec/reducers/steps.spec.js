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

  });

  describe('CREATE_STEP', () => {

  });

  describe('UPDATE_STEP', () => {

  });

  describe('DELETE_STEP', () => {

  });

  describe('FAILED_OPERATION', () => {

  });
});
