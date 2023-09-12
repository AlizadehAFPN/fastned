import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, StyleSheet} from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { CarListItem } from '../component/carListItem';
import { CarDetailInterface, CarInfo, NavigatorParamList } from '../Interface';
import { setCarDetail } from '../redux/carSlice';
import { AppDispatch } from '../redux/store';
import { fetchCarDetail } from '../services';


const CarList: FC<StackScreenProps<NavigatorParamList , "carList">> = () => {

	const dispatch = useDispatch<AppDispatch>();
	const navigation = useNavigation<NavigatorParamList>();
	const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
	const state = useSelector((state: { car: { carList: CarInfo[]} }) => state?.car);

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

	const onPressCar = (id: number) => {
		setSelectedCarId(id);
	};

return (
	<SafeAreaView style={styles.container}>
	<FlashList
		estimatedItemSize={state?.carList?.length}
		renderItem={({ item }: { item: CarInfo }) => (
			<CarListItem item={item} onPressCar={onPressCar} />
		  )}
		data={state?.carList}
	/>
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		paddingVertical: 16,
	}
});

export default CarList;