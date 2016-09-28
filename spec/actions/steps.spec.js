import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import { createStep, editStep, updateStep, deleteStep } from 'actions/steps';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Steps actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#createStep', () => {
    context('with valid attributes', () => {
      it('fires CREATE_STEP action', () => {
        const stepsParams = { step: { id: 1 } };

        nock('http://localhost:3000')
            .post('/api/v1/users/blablabla/directions/1/steps', stepsParams)
            .reply(200, stepsParams);

        const expectedActions = [
          { type: 'CREATE_STEP', step: { id: 1 } }
        ];

        const store = mockStore({});

        return store.dispatch(createStep('blablabla', 1, { id: 1 }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {

      it('fires FAILED_OPERATION action', () => {
        const stepsParams = { errors: { title: [] } };

        nock('http://localhost:3000')
            .post('/api/v1/users/blablabla/directions/1/steps', { step: {} })
            .reply(403, stepsParams);

        const expectedActions = [
          { type: 'FAILED_OPERATION', errors: { title: [] } }
        ];

        const store = mockStore({});

        return store.dispatch(createStep('blablabla', 1, {}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

    });
  });

  describe('#editStep', () => {
    it('fires EDIT_STEP action', () => {

      const expectedActions = [
        { type: 'EDIT_STEP', step: { id: 1 } }
      ];

      const store = mockStore({});

      return store.dispatch(editStep({ id: 1 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('#updateStep', () => {
    context('with valid attributes', () => {
      it('fires UPDATE_STEP action', () => {
        const stepsParams = { step: { id: 1 } };

        nock('http://localhost:3000')
            .put('/api/v1/users/blablabla/directions/1/steps/1', stepsParams)
            .reply(200, stepsParams);

        const expectedActions = [
          { type: 'UPDATE_STEP', step: { id: 1 } }
        ];

        const store = mockStore({});

        return store.dispatch(updateStep('blablabla', 1, 1, { id: 1 }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires FAILED_OPERATION', () => {
        const stepsParams = { errors: { title: [] } };

        nock('http://localhost:3000')
            .put('/api/v1/users/blablabla/directions/1/steps/1', { step: {} })
            .reply(403, stepsParams);

        const expectedActions = [
          { type: 'FAILED_OPERATION', errors: { title: [] } }
        ];

        const store = mockStore({});

        return store.dispatch(updateStep('blablabla', 1, 1, {}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#destroySpec', () => {
    it('fires DELETE_STEP action', () => {
      const stepsParams = { step: { id: 1 } };

      nock('http://localhost:3000')
          .delete('/api/v1/users/blablabla/directions/1/steps/1')
          .reply(200, stepsParams);

      const expectedActions = [
        { type: 'DELETE_STEP', step: { id: 1 } }
      ];

      const store = mockStore({});

      return store.dispatch(deleteStep('blablabla', 1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
