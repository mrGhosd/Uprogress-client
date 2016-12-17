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

  });

  describe('REMOVE_AUTHORIZATION', () => {

  });

  describe('REMOVE_AUTHORIZATIONS', () => {

  });

  describe('USER_STATISTICS_SUCCESS', () => {

  });
});
