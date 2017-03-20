import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import {
  signIn, signUp, signOut, currentUser,
  getUser, updateUser, getCurrentUserAuthorizations,
  removeAuthorization, removeAuthorizations, restorePassword,
  resetPassword, removeResetPassword, changePassword
} from 'actions/users';
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

        const currentUserParams = { currentUser: { email: 'example@test.com' } };

        localStorage.setItem('uprogresstoken', '12345');
        nock('http://localhost:3000', { reqheaders: { uprogresstoken: '12345' } })
            .get('/api/v1/sessions/current')
            .reply(200, currentUserParams);

        nock('http://localhost:3000')
            .post('/api/v1/sessions', userParams)
            .reply(200, tokenParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'SIGN_IN_USER', token: '123456' },
          { type: 'START_MAIN_LOADER' }
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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

    const authorization = getAuthorizationParams();

    context('with valid attributes', () => {
      it('fires SIGN_UP_USER', () => {
        const userParams = { user: { email: 'example@text.com', authorization } };
        const tokenParams = { token: '123456' };
        const currentUserParams = { currentUser: { email: 'example@test.com' } };

        localStorage.setItem('uprogresstoken', '12345');
        nock('http://localhost:3000', { reqheaders: { uprogresstoken: '12345' } })
            .get('/api/v1/sessions/current')
            .reply(200, currentUserParams);

        nock('http://localhost:3000')
            .post('/api/v1/registrations', userParams)
            .reply(200, tokenParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'SIGN_UP_USER', token: '123456' },
          { type: 'START_MAIN_LOADER' }
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
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

  describe('#getCurrentUserAuthorizations()', () => {
    context('with valid attributes', () => {
      it('fires AUTHORIZATIONS_LIST action', () => {
        const authorizations = {
          authorizations: [
            { id: 1 }
          ]
        };

        localStorage.setItem('uprogresstoken', '12345');
        nock('http://localhost:3000', { reqheaders: { uprogresstoken: '12345' } })
            .get('/api/v1/authorizations')
            .reply(200, authorizations);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'AUTHORIZATIONS_LIST', authorizations: authorizations.authorizations }
        ];

        const store = mockStore({});

        return store.dispatch(getCurrentUserAuthorizations())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires AUTHORIZATIONS_LIST_FAILED action', () => {
        const errorParams = { errors: { status: 403 } };

        localStorage.setItem('uprogresstoken', '12345');
        nock('http://localhost:3000', { reqheaders: { uprogresstoken: '12345' } })
            .get('/api/v1/authorizations')
            .reply(403, errorParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'AUTHORIZATIONS_LIST_FAILED', errors: errorParams.errors }
        ];

        const store = mockStore({});

        return store.dispatch(getCurrentUserAuthorizations())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#removeAuthorization()', () => {
    context('with valid attributes', () => {
      it('fires REMOVE_AUTHORIZATION action', () => {
        const authorizations = {
          authorization:
          {
            id: 1
          }
        };

        localStorage.setItem('uprogresstoken', '12345');
        nock('http://localhost:3000', { reqheaders: { uprogresstoken: '12345' } })
            .delete('/api/v1/authorizations/1')
            .reply(200, authorizations);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'REMOVE_AUTHORIZATION', authorization: authorizations.authorization }
        ];

        const store = mockStore({});

        return store.dispatch(removeAuthorization(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      //  TODO: implement handling
    });
  });

  describe('#removeAuthorizations()', () => {
    it('fires REMOVE_AUTHORIZATIONS action', () => {
      const expectedActions = { type: 'REMOVE_AUTHORIZATIONS' };

      expect(removeAuthorizations()).toEqual(expectedActions);
    });
  });

  describe('#restorePassword()', () => {
    context('with valid attributes', () => {
      it('fires PASSWORD_RESTORE_SUCCESS action', () => {
        const requestParams = { user: { email: 'example@text.com' } };
        const responseParams = { token: '12345', message: 'Ahahaha' };

        nock('http://localhost:3000')
            .post('/api/v1/sessions/restore_password', requestParams)
            .reply(200, responseParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'PASSWORD_RESTORE_SUCCESS', token: '12345' }
        ];

        const store = mockStore({});

        return store.dispatch(restorePassword({ email: 'example@text.com' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires PASSWORD_RESTORE_SUCCESS action', () => {
        const requestParams = { user: { email: 'example@text.com' } };
        const responseParams = { errors: { email: 'There is no such user' } };

        nock('http://localhost:3000')
            .post('/api/v1/sessions/restore_password', requestParams)
            .reply(403, responseParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'PASSWORD_RESTORE_FAILED', errors: responseParams.errors }
        ];

        const store = mockStore({});

        return store.dispatch(restorePassword({ email: 'example@text.com' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#resetPassword', () => {
    context('with valid attributes', () => {
      it('fires PASSWORD_RESET_SUCCESS action', () => {
        const requestParams = {
          password: 'password',
          password_confirmation: 'password',
          token: '12345'
        };
        const responseParams = { message: 'Success' };

        nock('http://localhost:3000')
            .put('/api/v1/sessions/reset_password', { user: requestParams })
            .reply(200, responseParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'PASSWORD_RESET_SUCCESS', resetPassword: true }
        ];

        const store = mockStore({});

        return store.dispatch(resetPassword(requestParams))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires PASSWORD_RESET_FAILED action', () => {
        const requestParams = {
          password: 'password',
          password_confirmation: 'password',
          token: ''
        };
        const responseParams = { errors: { token: 'Invalid' } };

        nock('http://localhost:3000')
            .put('/api/v1/sessions/reset_password', { user: requestParams })
            .reply(403, responseParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'PASSWORD_RESET_FAILED', errors: responseParams.errors }
        ];

        const store = mockStore({});

        return store.dispatch(resetPassword(requestParams))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });

  describe('#removeResetPassword', () => {
    it('fires DEFAULT_RESET action', () => {
      const expectedActions = { type: 'DEFAULT_RESET' };

      expect(removeResetPassword()).toEqual(expectedActions);
    });
  });

  describe('#changePassword', () => {
    context('with valid attributes', () => {
      it('fires PASSWORD_CHANGE_SUCCESS action', () => {
        const requestParams = {
          password: 'password',
          password_confirmation: 'password',
        };
        const responseParams = { current_user: { id: 1 } };

        nock('http://localhost:3000')
            .put('/api/v1/users/change_password', { user: requestParams })
            .reply(200, responseParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'PASSWORD_CHANGE_SUCCESS' }
        ];

        const store = mockStore({});

        return store.dispatch(changePassword(requestParams))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    context('with invalid attributes', () => {
      it('fires PASSWORD_CHANGE_FAILED action', () => {
        const requestParams = {
          password: 'password',
          password_confirmation: 'password',
        };
        const responseParams = { errors: { password: 'Invalid' } };

        nock('http://localhost:3000')
            .put('/api/v1/users/change_password', { user: requestParams })
            .reply(403, responseParams);

        const expectedActions = [
          { type: 'START_MAIN_LOADER' },
          { type: 'STOP_MAIN_LOADER' },
          { type: 'PASSWORD_CHANGE_FAILED', errors: responseParams.errors }
        ];

        const store = mockStore({});

        return store.dispatch(changePassword(requestParams))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });
  });
});
