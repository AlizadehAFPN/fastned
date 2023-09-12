import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarList from '../screen/CarList';
import CarDetail from '../screen/CarDetail';
import { useDispatch } from 'react-redux';
import { fetchCarList } from '../services';
import { useQuery } from 'react-query';
import { getCarList } from '../redux/carSlice';
import { CarInfo, NavigatorParamList } from '../Interface';
import { StackScreenProps } from '@react-navigation/stack';

const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppNavigator = () => {

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Car" component={CarStack} />
		</Stack.Navigator>
	);

}

const CarStack :React.FC<StackScreenProps<NavigatorParamList>> = () => {

	const dispatch = useDispatch();
	useQuery('carList', () => fetchCarList(),
	{
		onSuccess: (data : CarInfo[]) => {
			dispatch(getCarList(data))
		},
		onError: (error) => {}
	});

	return (
		<Stack.Navigator >
			<Stack.Screen name="carList" component={CarList} options={{ title: 'Cars' }}/>
			<Stack.Screen name="carDetail" component={CarDetail} options={{ title: 'Detail' }}/>
		</Stack.Navigator>
	);

}
export default AppNavigator
