import React, { FC} from 'react';
import { Linking, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import {StackScreenProps} from "@react-navigation/stack"
import { CarDetailInterface, NavigatorParamList } from '../Interface';
import { carDetailStyles } from '../Styles/carDetailStyles';
import { renderDetail } from '../component/renderItemDetail';

const CarDetail: FC<StackScreenProps<NavigatorParamList , "carDetail">> = () => {
	const state = useSelector((state: CarDetailInterface) => state?.car);

  return (
    <SafeAreaView style={carDetailStyles.container}>

      <FastImage
        style={carDetailStyles.image}
        source={{
          uri: state.carDetail?.imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}/>

      <TouchableOpacity
        onPress={() => Linking.openURL(state.carDetail?.helpUrl)}
        style={carDetailStyles.helpButton}>
        <Text style={carDetailStyles.helpButtonText}>Need Help?</Text>
      </TouchableOpacity>

        {renderDetail("Brand", state.carDetail?.brand)}
        {renderDetail("Model", state.carDetail?.model)}
        {renderDetail("Version", state.carDetail?.version)}
        {renderDetail("Category", state.carDetail?.category)}
        {renderDetail("Connector Type", state.carDetail?.connectorType)}
        {renderDetail("Recommended Charger", state.carDetail?.recommendedCharger)}
        {renderDetail("Charge Speed In Kw", state.carDetail?.chargeSpeedInKw)}

      <TouchableOpacity style={carDetailStyles.chargeButton}>
        <Text style={carDetailStyles.chargeButtonText}>Charge</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
export default CarDetail