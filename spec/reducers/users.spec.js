import reducer from 'reducers/users';
import expect from 'expect';

describe('Users reducers', () => {
  describe('SIGN_IN_USER', () => {
    const token = '12345';

    it('return updated list key', () => {
      expect(
        reducer({ signInErrors: {} }, { type: 'SIGN_IN_USER', token })
      ).toEqual({ signInErrors: {} });
    });

    it('saves token in localStorage', () => {
      reducer({ signInErrors: {} }, { type: 'SIGN_IN_USER', token });
      expect(localStorage.getItem('uprogresstoken')).toEqual(token);
    });
  });

  describe('SIGN_IN_FAILED', () => {
    it('return updated signInErrors key', () => {
      const errors = { email: 'Email' };

      expect(
        reducer({ }, { type: 'SIGN_IN_FAILED', errors })
      ).toEqual({ signInErrors: errors });
    });
  });

  describe('SIGN_UP_USER', () => {
    const token = '12345';

    it('return updated list key', () => {
      expect(
        reducer({ signUpErrors: {} }, { type: 'SIGN_UP_USER', token })
      ).toEqual({ signUpErrors: {} });
    });

    it('saves token in localStorage', () => {
      reducer({ signUpErrors: {} }, { type: 'SIGN_UP_USER', token });
      expect(localStorage.getItem('uprogresstoken')).toEqual(token);
    });
  });

  describe('SIGN_UP_FAILED', () => {
    it('return updated signUpErrors key', () => {
      const errors = { email: 'Email' };

      expect(
        reducer({ }, { type: 'SIGN_UP_FAILED', errors })
      ).toEqual({ signUpErrors: errors });
    });
  });

  describe('CURRENT_USER', () => {
    it('returns updated current key', () => {
      const current = { id: 1 };

      expect(
        reducer({ }, { type: 'CURRENT_USER', current })
      ).toEqual({ current });
    });
  });

  describe('USER_UPLOAD_AVATAR', () => {
    it('returns updated attachment key in current', () => {
      const current = { attachment: {} };
      const attachment = { url: '1' };

      expect(
        reducer({ current }, { type: 'USER_UPLOAD_AVATAR', attachment })
      ).toEqual({ current: { attachment } });
    });
  });

  describe('USER_INFO', () => {
    it('returns updated show key', () => {
      const user = { id: 1 };

      expect(
        reducer({}, { type: 'USER_INFO', user })
      ).toEqual({ show: user });
    });
  });

  describe('USER_INFO_FAILED', () => {
    it('returns updated show key', () => {
      expect(
        reducer({ show: { id: 1 } }, { type: 'USER_INFO_FAILED' })
      ).toEqual({ show: {} });
    });
  });

  describe('SIGN_OUT', () => {
    const current = { id: 1 };
    const token = '12345';

    localStorage.setItem('uprogresstoken', token);

    it('returns updated current key', () => {
      expect(
        reducer({ current }, { type: 'SIGN_OUT' })
      ).toEqual({ current: {} });
    });

    it('removes token from localstorage', () => {
      reducer({ current }, { type: 'SIGN_OUT' });
      expect(localStorage.getItem('uprogresstoken')).toEqual(null);
    });
  });

  describe('AUTHORIZATIONS_LIST', () => {
    it('return update authorizations key', () => {
      const authorizations = [{ id: 1 }];

      expect(
        reducer({}, { type: 'AUTHORIZATIONS_LIST', authorizations })
      ).toEqual({ authorizations });
    });
  });

  describe('REMOVE_AUTHORIZATION', () => {
    it('return update authorizations key', () => {
      const authorizations = [{ id: 1 }];

      expect(
        reducer({ authorizations }, { type: 'REMOVE_AUTHORIZATION', authorization: authorizations[0] })
      ).toEqual({ authorizations: [] });
    });
  });

  describe('REMOVE_AUTHORIZATIONS', () => {
    it('return update authorizations key', () => {
      const authorizations = [{ id: 1 }];

      expect(
        reducer({ authorizations }, { type: 'REMOVE_AUTHORIZATIONS' })
      ).toEqual({ authorizations: [] });
    });
  });

  describe('USER_STATISTICS_SUCCESS', () => {
    it('return update statistics key', () => {
      const defaultState = { show: { statistics: [] } };
      const statistics = [{ id: 1 }];

      expect(
        reducer(defaultState, { type: 'USER_STATISTICS_SUCCESS', statistics })
      ).toEqual({ show: { statistics } });
    });
  });

  describe('PASSWORD_RESTORE_SUCCESS', () => {
    it('return empty restorePasswordErrors key', () => {
      const defaultState = { restorePasswordErrors: { email: ['There is no such user'] } };
      const action = { token: '12345' };

      expect(
        reducer(defaultState, { type: 'PASSWORD_RESTORE_SUCCESS', action })
      ).toEqual({ restorePasswordErrors: {} });
    });
  });

  describe('PASSWORD_RESTORE_FAILED', () => {
    it('return empty restorePasswordErrors key', () => {
      const defaultState = { restorePasswordErrors: {} };
      const action = { email: ['There is no such user'] };

      expect(
        reducer(defaultState, { type: 'PASSWORD_RESTORE_FAILED', action })
      ).toEqual({ restorePasswordErrors: action.errors });
    });
  });

  describe('PASSWORD_RESET_SUCCESS', () => {
    it('return empty resetPasswordErrors key', () => {
      const defaultState = { resetPasswordErrors: { password: ['Does not match password'] }, resetPassword: false };
      const action = { resetPassword: true };

      expect(
        reducer(defaultState, { type: 'PASSWORD_RESET_SUCCESS', resetPassword: action.resetPassword })
      ).toEqual({ resetPasswordErrors: {}, resetPassword: true });
    });
  });

  describe('PASSWORD_RESET_FAILED', () => {
    it('return filled resetPasswordErrors key', () => {
      const defaultState = { resetPasswordErrors: [] };
      const action = { token: ['There is no suce token'] };

      expect(
        reducer(defaultState, { type: 'PASSWORD_RESET_FAILED', action })
      ).toEqual({ resetPasswordErrors: action.errors });
    });
  });

  describe('DEFAULT_RESET', () => {
    it('return false resetPassword key', () => {
      const defaultState = { resetPassword: true };

      expect(
        reducer(defaultState, { type: 'DEFAULT_RESET' })
      ).toEqual({ resetPassword: false });
    });
  });

  describe('PASSWORD_CHANGE_SUCCESS', () => {
    it('return false changePassword key', () => {
      const defaultState = { changePasswordErrors: { email: ['Can\'t be blank'] } };

      expect(
        reducer(defaultState, { type: 'PASSWORD_CHANGE_SUCCESS' })
      ).toEqual({ changePasswordErrors: {} });
    });
  });

  describe('PASSWORD_CHANGE_FAILED', () => {
    it('return fulled changePassword', () => {
      const defaultState = { changePasswordErrors: {} };

      expect(
        reducer(defaultState, { type: 'PASSWORD_CHANGE_FAILED', errors: { email: ['Can\'t be blank'] } })
      ).toEqual({ changePasswordErrors: { email: ['Can\'t be blank'] } });
    });
  });
});
