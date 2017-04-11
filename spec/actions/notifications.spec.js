import nock from 'nock';
import expect from 'expect';
import messages from 'text/messages';
import {
  Info, Alert, DropNotification
} from 'actions/notifications';

describe('Notifications actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('Info()', () => {
    it('fires ADD_INFO_NOTIFICATION action', () => {
      const content = messages['directionCreateSuccess'];
      const structure = {
        id: 'id-6',
        type: 'info',
        content
      };
      const expectedActions = { type: 'ADD_INFO_NOTIFICATION', notification: structure };

      expect(Info('directionCreateSuccess')).toEqual(expectedActions);
    });

  });

  describe('Alert()', () => {
    it('fires ADD_ALERT_NOTIFICATION action', () => {
      const content = messages['directionCreateSuccess'];
      const structure = {
        id: 'id-7',
        type: 'danger',
        content
      };
      const expectedActions = { type: 'ADD_ALERT_NOTIFICATION', notification: structure };

      expect(Alert('directionCreateSuccess')).toEqual(expectedActions);
    });
  });

  describe('DropNotification()', () => {
    const expectedActions = { type: 'DROP_NOTIFICATION', id: 1 };

    expect(DropNotification(1)).toEqual(expectedActions);
  });
});
