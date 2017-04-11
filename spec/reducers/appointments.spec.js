import reducer from 'reducers/appointments';
import expect from 'expect';

const initialState = {
  list: [],
  errors: {}
};

describe('Appointments reducer', () => {
  describe('DIRECTION', () => {
    it('returns updated list key', () => {
      const list = { appointments: [{ id: 1 }, { id: 2 }] };

      expect(
        reducer([], { type: 'DIRECTION', direction: list })
      ).toEqual({ list: list.appointments });
    });
  });

  describe('NEW_APPOINTMENT', () => {

  });

  describe('APPOINTMENT_FAILED', () => {

  });

  describe('UPDATE_APPOINTMENT', () => {

  });

  describe('DELETE_APPOINTMENT', () => {

  });
});
