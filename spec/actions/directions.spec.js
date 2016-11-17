import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import { getList, getDirection, createDirection, updateDirection } from 'actions/directions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Directions actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#getList', () => {

    it('check GET_DIRECTIONS_LIST action', () => {
      nock('http://localhost:3000')
          .get('/api/v1/users/blablabla/directions')
          .reply(200, { directions: [{ id: 1 }, { id: 2 }] });

      const expectedActions = [
        { type: 'GET_DIRECTIONS_LIST', directions: [{ id: 1 }, { id: 2 }] }
      ];

      const store = mockStore({});

      return store.dispatch(getList('blablabla'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('#getDirection', () => {
    it('check GET_DIRECTION action', () => {
      nock('http://localhost:3000')
          .get('/api/v1/users/blablabla/directions/1')
          .reply(200, { direction: { id: 1 } });

      const expectedActions = [
        { type: 'START_MAIN_LOADER' },
        { type: 'STOP_MAIN_LOADER' },
        { type: 'DIRECTION', direction: { id: 1 } }
      ];

      const store = mockStore({});

      return store.dispatch(getDirection('blablabla', 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('#createDirection', () => {
    context('with valid attributes', () => {
      it('fires NEW_DIRECTION action with valid attributes', () => {
        const directionParams = { direction: { id: 1 } };

        nock('http://localhost:3000')
            .post('/api/v1/users/blablabla/directions', directionParams)
            .reply(200, directionParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'NEW_DIRECTION', direction: { id: 1 }, created: true }
        ];

        const store = mockStore({});

        return store.dispatch(createDirection('blablabla', { id: 1 }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires DIRECTION_FAILED action with invalid attribtes', () => {
        const directionParams = { errors: { email: [] } };

        nock('http://localhost:3000')
            .post('/api/v1/users/blablabla/directions', { direction: {} })
            .reply(403, directionParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'DIRECTION_FAILED', errors: { email: [] } }
        ];

        const store = mockStore({});

        return store.dispatch(createDirection('blablabla', {}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#updateDirection', () => {
    context('with valid attributes', () => {
      it('fires UPDATE_DIRECTION action with valid attributes', () => {
        const directionParams = { direction: { id: 1 } };

        nock('http://localhost:3000')
            .put('/api/v1/users/blablabla/directions/1', directionParams)
            .reply(200, directionParams);

        const expectedActions = [
          { type: 'UPDATE_DIRECTION', direction: { id: 1 }, updated: true }
        ];

        const store = mockStore({});

        return store.dispatch(updateDirection('blablabla', 1, { id: 1 }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires DIRECTION_FAILED action with invalid attribtes', () => {
        const directionParams = { errors: { email: [] } };

        nock('http://localhost:3000')
            .put('/api/v1/users/blablabla/directions/1', { direction: {} })
            .reply(403, directionParams);

        const expectedActions = [
          { type: 'DIRECTION_FAILED', errors: { email: [] } }
        ];

        const store = mockStore({});

        return store.dispatch(updateDirection('blablabla', 1, {}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });
});
