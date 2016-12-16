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

  });

  describe('USER_UPLOAD_AVATAR', () => {

  });

  describe('USER_INFO', () => {

  });

  describe('USER_INFO_FAILED', () => {

  });

  describe('SIGN_OUT', () => {

  });

  describe('AUTHORIZATIONS_LIST', () => {

  });

  describe('REMOVE_AUTHORIZATION', () => {

  });

  describe('REMOVE_AUTHORIZATIONS', () => {

  });

  describe('USER_STATISTICS_SUCCESS', () => {

  });
});
