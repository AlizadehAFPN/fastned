import React, { FC, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { CarListItem } from '../component/carListItem';
import { CarDetailInterface, CarInfo, NavigatorParamList } from '../Interface';
import { getCarList, setCarDetail } from '../redux/carSlice';
import { AppDispatch } from '../redux/store';
import { fetchCarDetail, fetchCarList } from '../services';
import { isEmpty } from 'lodash';
import { useSearch } from '../services/useSearch';
import { carDetailStyles } from '../Styles/carDetailStyles';

type PrivateScreenProps = {
	navigation: StackScreenProps<NavigatorParamList, 'carList'>['navigation'];
	route: StackScreenProps<NavigatorParamList, 'carList'>['route'];
		};

const CarList: FC<PrivateScreenProps> = ({navigation }) => {

	const dispatch = useDispatch<AppDispatch>();
	const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
	const state = useSelector((state: { car: { carList: CarInfo[]} }) => state?.car);
	const { search } = useSearch(state?.carList || []);
	const [query, setQuery] = useState<string>(''); // Initialize the query state

	const filteredData = search(query);

	useQuery('carDetail', () => fetchCarDetail(selectedCarId), {
		enabled: !!selectedCarId,
		onSuccess: (data : CarDetailInterface) => {
			dispatch(setCarDetail(data));
			navigation.navigate('carDetail');
			setSelectedCarId(null);
		},
		onError: (error) => {
			// console.log(error , '------')
		},
	});

	useQuery('carList', () => fetchCarList(),
	{
		onSuccess: (data : CarInfo[]) => {
			dispatch(getCarList(data))
		},
		onError: (error) => {}
	});


	const onPressCar = (id: number) => {
		setSelectedCarId(id);
	};

return (
	<SafeAreaView testID={`carListItem`} style={carDetailStyles.container}>
	
	<TextInput
        placeholder="Search Cars ..."
        onChangeText={setQuery}
        style={carDetailStyles.searchInput}
      />
		<FlashList
		estimatedItemSize={isEmpty(state?.carList) ? 100 : state?.carList?.length}
		renderItem={({ item }: { item: CarInfo }) => (
			<CarListItem  item={item} onPressCar={onPressCar} />
		)}
		data={filteredData}
		/>
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	
});

export default CarList;
