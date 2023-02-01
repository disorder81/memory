import { useEffect, useReducer } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

function useFetch<T = unknown>(url: string, options?: RequestInit): State<T> {
  const initialState: State<T> = {
    data: undefined,
    error: undefined
  };

  const reducer = (state: State<T>, action: any): State<T> => {
    const { type, payload } = action;
    switch (type) {
      case 'loading': {
        return { ...initialState };
      }
      case 'fetchSuccess': {
        return { ...initialState, data: payload };
      }
      case 'fetchError': {
        return { ...initialState, error: payload };
      }
      /* istanbul ignore next */
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'loading' });
      try {
        const response = await fetch(url, options);
        if (!response?.ok) {
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as T;
        dispatch({ type: 'fetchSuccess', payload: data });
      } catch (error) {
        dispatch({ type: 'fetchError', payload: error as Error });
      }
    }

    void fetchData();
  }, [url]);

  return state;
}

export default useFetch;
