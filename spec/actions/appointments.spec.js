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
  });
});
