import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import { createAppointment, updateAppointment, deleteAppointment } from 'actions/appointments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Appointments actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('#createAppointment', () => {
    context('with valid attributes', () => {
      it('succesfully creates new appointment', () => {
        const params = { appointment: { id: 1 } };

        nock('http://localhost:3000')
            .post('/api/v1/appointments', params)
            .reply(200, params);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'NEW_APPOINTMENT', appointment: { id: 1 } }
        ];

        const store = mockStore({});

        return store.dispatch(createAppointment(params.appointment))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires APPOINTMENT_FAILED reducer action', () => {
        const params = { appointment: { id: 1 } };
        const errors = { errors: { email: ['Can\'t be blank'] } };

        nock('http://localhost:3000')
            .post('/api/v1/appointments', params)
            .reply(422, errors);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'APPOINTMENT_FAILED', errors: errors.errors }
        ];

        const store = mockStore({});

        return store.dispatch(createAppointment(params.appointment))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#updateAppointment', () => {
    context('with valid attributes', () => {
      it('fires UPDATE_APPOINTMENT action', () => {
        const params = { appointment: { id: 1 } };

        nock('http://localhost:3000')
            .put('/api/v1/appointments/1', params)
            .reply(200, params);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'UPDATE_APPOINTMENT', appointment: { id: 1 } }
        ];

        const store = mockStore({});

        return store.dispatch(updateAppointment(1, params.appointment))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires APPOINTMENT_FAILED action', () => {
        const params = { appointment: { id: 1 } };
        const errors = { errors: { email: ['Can\'t be blank'] } };

        nock('http://localhost:3000')
            .put('/api/v1/appointments/1', params)
            .reply(422, errors);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'APPOINTMENT_FAILED', errors: errors.errors }
        ];

        const store = mockStore({});

        return store.dispatch(updateAppointment(1, params.appointment))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#deleteAppointment', () => {
    it('deletes appointment', () => {
      const params = { appointment: { id: 1 } };
      
      nock('http://localhost:3000')
          .delete('/api/v1/appointments/1')
          .reply(200, params);

      const expectedActions = [
        { type: 'START_MAIN_LOADER' },
        { type: 'STOP_MAIN_LOADER' },
        { type: 'DELETE_APPOINTMENT', appointment: { id: 1 } }
      ];

      const store = mockStore({});

      return store.dispatch(deleteAppointment(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
