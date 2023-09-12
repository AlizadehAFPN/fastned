import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient: QueryClient = new QueryClient();

export default function App() {

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<NavigationContainer >
					<AppNavigator/>
				</NavigationContainer>
			</QueryClientProvider>
		</Provider>
	);

}
