import React, { FC, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
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

const CarList: FC<PrivateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const state = useSelector((state: { car: { carList: CarInfo[] } }) => state?.car);

  // Initialize the search functionality
  const { search } = useSearch(state?.carList || []);
  const [query, setQuery] = useState<string>(''); // Initialize the query state

  // Apply search to filter the data based on the query
  const filteredData = search(query);

  // Fetch car details for the selected car
  useQuery('carDetail', () => fetchCarDetail(selectedCarId), {
    enabled: !!selectedCarId,
    onSuccess: (data: CarDetailInterface) => {
      dispatch(setCarDetail(data));
      navigation.navigate('carDetail');
      setSelectedCarId(null);
    },
    onError: (error) => {
      // Handle error
    },
  });

  // Function to handle the "Press Car" action
  const onPressCar = (id: number) => {
    setSelectedCarId(id);
  };

  return (
    <SafeAreaView testID={`carListItem`} style={carDetailStyles.container}>
      {/* Search input */}
      <TextInput
        placeholder="Search Cars ..."
        onChangeText={setQuery}
        style={carDetailStyles.searchInput}
      />

      {/* Car list */}
      <FlashList
        estimatedItemSize={isEmpty(state?.carList) ? 100 : state?.carList?.length}
        renderItem={({ item }: { item: CarInfo }) => (
          <CarListItem item={item} onPressCar={onPressCar} />
        )}
        data={filteredData} // Use filteredData for the list
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CarList;
