import reducer from 'reducers/loaders';
import expect from 'expect';

describe('Loaders reducers', () => {
  describe('START_MAIN_LOADER', () => {
    it('returns updated main key', () => {
      expect(
        reducer({ main: true }, { type: 'START_MAIN_LOADER' })
      ).toEqual({ main: false });
    });
  });

  describe('STOP_MAIN_LOADER', () => {
    it('returns updated main key', () => {
      expect(
        reducer({ main: false }, { type: 'STOP_MAIN_LOADER' })
      ).toEqual({ main: true });
    });
  });

  describe('START_FILE_LOADER', () => {
    it('returns updated file key', () => {
      expect(
        reducer({ file: true }, { type: 'START_FILE_LOADER' })
      ).toEqual({ file: false });
    });
  });

  describe('STOP_FILE_LOADER', () => {
    it('returns updated file key', () => {
      expect(
        reducer({ file: false }, { type: 'STOP_FILE_LOADER' })
      ).toEqual({ file: true });
    });
  });
});
