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
    it('returns updated list', () => {
      const appointment = { id: 1 };

      expect(
        reducer(initialState, { type: 'NEW_APPOINTMENT', appointment })
      ).toEqual({ list: [appointment], errors: {} });
    });
  });

  describe('APPOINTMENT_FAILED', () => {
    it('returns updated error', () => {
      const errors = { email: [] };

      expect(
        reducer(initialState, { type: 'APPOINTMENT_FAILED', errors })
      ).toEqual({ list: [], errors });
    });
  });

  describe('UPDATE_APPOINTMENT', () => {
    it('returns updated list', () => {
      const defaultState = { list: [{ id: 1, title: 'Title' }] };
      const appointment = { id: 1, title: 'Title1' };

      expect(
        reducer(defaultState, { type: 'UPDATE_APPOINTMENT', appointment })
      ).toEqual({ list: [appointment] });
    });
  });

  describe('DELETE_APPOINTMENT', () => {

  });
});
