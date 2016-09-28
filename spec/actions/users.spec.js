import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import { signIn, signUp, signOut, currentUser, getUser, updateUser } from 'actions/users';
import { initLocalStorage } from 'utils/localStorage';
import { getAuthorizationParams } from 'utils/browser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Users actions', () => {

  beforeEach(() => {
    initLocalStorage();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#signIn', () => {

    const authorization = getAuthorizationParams();

    context('with valid attributes', () => {
      it('fires SIGN_IN_USER action', () => {

        const userParams = { user: { email: 'example@text.com', authorization } };
        const tokenParams = { token: '123456' };


        nock('http://localhost:3000')
            .post('/api/v1/sessions', userParams)
            .reply(200, tokenParams);

        const expectedActions = [
          { type: 'SIGN_IN_USER', token: '123456' }
        ];

        const store = mockStore({});

        return store.dispatch(signIn({ email: 'example@text.com' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires SIGN_IN_FAILED action', () => {
        const userParams = { user: { email: '', authorization } };
        const errorParams = { errors: { email: [] } };


        nock('http://localhost:3000')
            .post('/api/v1/sessions', userParams)
            .reply(403, errorParams);

        const expectedActions = [
          { type: 'SIGN_IN_FAILED', errors: { email: [] } }
        ];

        const store = mockStore({});

        return store.dispatch(signIn({ email: '' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#signUp', () => {

    const authorization = {
      platform: 'Darwin',
      platform_version: null,
      app_name: 'Node.js',
      app_version: '6.4.0',
      provider: 'UProgress'
    };

    context('with valid attributes', () => {
      it('fires SIGN_UP_USER', () => {
        const userParams = { user: { email: 'example@text.com', authorization } };
        const tokenParams = { token: '123456' };

        nock('http://localhost:3000')
            .post('/api/v1/registrations', userParams)
            .reply(200, tokenParams);

        const expectedActions = [
          { type: 'SIGN_UP_USER', token: '123456' }
        ];

        const store = mockStore({});

        return store.dispatch(signUp({ email: 'example@text.com' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires SIGN_UP_FAILED', () => {
        const userParams = { user: { email: '', authorization } };
        const errorParams = { errors: { email: [] } };

        nock('http://localhost:3000')
            .post('/api/v1/registrations', userParams)
            .reply(403, errorParams);

        const expectedActions = [
          { type: 'SIGN_UP_FAILED', errors: { email: [] } }
        ];

        const store = mockStore({});

        return store.dispatch(signUp({ email: '' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#signOut', () => {
    it('fires SIGN_OUT action', () => {
      const expectedActions = { type: 'SIGN_OUT' };

      expect(signOut()).toEqual(expectedActions);
    });
  });

  describe('#currentUser', () => {
    context('with valid attributes', () => {
      it('fires CURRENT_USER action', () => {
        const userParams = { currentUser: { email: 'example@test.com' } };

        localStorage.setItem('uprogresstoken', '12345');
        nock('http://localhost:3000', { reqheaders: { uprogresstoken: '12345' } })
            .get('/api/v1/sessions/current')
            .reply(200, userParams);

        const expectedActions = [
          { type: 'CURRENT_USER', current: { email: 'example@test.com' } }
        ];

        const store = mockStore({});

        return store.dispatch(currentUser())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires CURRENT_USER_FAILED action', () => {
        const userParams = { user: null };

        nock('http://localhost:3000')
            .get('/api/v1/sessions/current')
            .reply(403, userParams);

        const expectedActions = [
          { type: 'CURRENT_USER_FAILED', user: null }
        ];

        const store = mockStore({});

        return store.dispatch(currentUser())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#getUser', () => {
    context('with valid attributes', () => {
      it('fires USER_INFO action', () => {
        const userParams = { user: { nick: 'example' } };

        nock('http://localhost:3000')
            .get('/api/v1/users/1')
            .reply(200, userParams);

        const expectedActions = [
          { type: 'USER_INFO', user: { nick: 'example' } }
        ];

        const store = mockStore({});

        return store.dispatch(getUser(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires USER_INFO_FAILED action', () => {
        const errorParams = { errors: 'User not found' };

        nock('http://localhost:3000')
            .get('/api/v1/users/1')
            .reply(404, errorParams);

        const expectedActions = [
          { type: 'USER_INFO_FAILED', errors: 'User not found' }
        ];

        const store = mockStore({});

        return store.dispatch(getUser(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#updateUser', () => {
    context('with valid attributes', () => {
      it('fires USER_UPDATE_SUCCESS action', () => {
        const userParams = { currentUser: { nick: 'example' } };

        nock('http://localhost:3000')
            .put('/api/v1/users/1')
            .reply(200, userParams);

        const expectedActions = [
          { type: 'USER_UPDATE_SUCCESS', current: { nick: 'example' } }
        ];

        const store = mockStore({});

        return store.dispatch(updateUser(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires USER_UPDATE_FAILED action', () => {
        const userParams = { errors: { email: [] } };

        nock('http://localhost:3000')
            .put('/api/v1/users/1')
            .reply(403, userParams);

        const expectedActions = [
          { type: 'USER_UPDATE_FAILED', errors: userParams.errors }
        ];

        const store = mockStore({});

        return store.dispatch(updateUser(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });
});
