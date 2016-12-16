import reducer from 'reducers/loaders';
import expect from 'expect';

describe('Loaders reducers', () => {
  describe('START_MAIN_LOADER', () => {
    it('returns updated list key', () => {
      expect(
        reducer( { main: true }, { type: 'START_MAIN_LOADER' })
      ).toEqual({ main: false });
    });
  });

  describe('STOP_MAIN_LOADER', () => {

  });

  describe('START_FILE_LOADER', () => {

  });

  describe('STOP_FILE_LOADER', () => {

  });
});
