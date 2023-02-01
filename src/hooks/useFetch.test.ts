import { renderHook, waitFor } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch', () => {
  const url = 'url';
  it('performs a GET request', async () => {
    const { result } = renderHook(() => useFetch(url));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toHaveLength(30);
    });
  });

  it(`throws an error if there's a fetch error`, async () => {
    fetchMock.mockResponseOnce('{}', { status: 500 });
    const { result } = renderHook(() => useFetch(url));
    await waitFor(() => {
      expect(result.current.error).not.toBeUndefined();
    });
  });
});
