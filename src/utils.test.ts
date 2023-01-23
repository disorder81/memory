import { shuffle } from './utils';

describe('shuffle', () => {
  const array = [1, 2, 3];

  it('should return a new array', function () {
    expect(shuffle(array)).not.toBe(array);
  });

  describe('when receiving empty or invalid values', () => {
    it('should return an empty array', () => {
      expect(shuffle([])).toEqual([]);
      expect(shuffle(undefined as unknown as any[])).toEqual([]);
      expect(shuffle(null as unknown as any[])).toEqual([]);
      expect(shuffle('a' as unknown as any[])).toEqual([]);
      expect(shuffle(1 as unknown as any[])).toEqual([]);
    });
  });
});
