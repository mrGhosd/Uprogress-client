import reducer from 'reducers/notifications';
import expect from 'expect';

describe('Notifications reducers', () => {
  describe('ADD_INFO_NOTIFICATION', () => {
    it('returns updated list key', () => {
      const notification = { type: 'info', message: 'a' };

      expect(
        reducer( { list: [] }, { type: 'ADD_INFO_NOTIFICATION', notification })
      ).toEqual({ list: [notification] });
    });
  });

  describe('ADD_ALERT_NOTIFICATION', () => {
    it('returns updated list key', () => {
      const notification = { type: 'alert', message: 'a' };

      expect(
        reducer( { list: [] }, { type: 'ADD_ALERT_NOTIFICATION', notification })
      ).toEqual({ list: [notification] });
    });
  });

  describe('DROP_NOTIFICATION', () => {
    it('returns updated list key', () => {
      const defaultNotifications = { list: [{ id: 1, type: 'alert', message: 'a' }] };

      expect(
        reducer( defaultNotifications, { type: 'DROP_NOTIFICATION', id: 1 })
      ).toEqual({ list: [] });
    });
  });
});
