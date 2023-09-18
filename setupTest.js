// setupTests.js


import '@testing-library/jest-native/extend-expect';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // You may need to install this package

// Create a mock store using redux-mock-store
const mockStore = configureStore([]);
fetchMock.enableMocks();

// Create a mock QueryClient
const queryClient = new QueryClient();

// Create a function to render components with the necessary providers
const renderWithProviders = (
  component,
  { initialState, store = mockStore({ ...initialState }) } = {}
) => {
  return render(
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{component}</Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};


// Configure fetchMock to work with TypeScript
fetchMock.enableMocks();

// Export fetchMock for global access
export {renderWithProviders , fetchMock}
