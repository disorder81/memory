import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { mockAvatars } from './src/test/mock';

fetchMock.enableMocks();
fetchMock.mockResponse(JSON.stringify(mockAvatars));
