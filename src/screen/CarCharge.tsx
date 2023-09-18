import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { Animated, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { AppDispatch } from '../redux/store';
import { setChargeProgress } from '../redux/carSlice';
import { CarDetailInterface, NavigatorParamList } from '../Interface';
import { renderDetail } from '../component/renderItemDetail';
import FastImage from 'react-native-fast-image';
import { carDetailStyles } from '../Styles/carDetailStyles';
let speed : number = 200;
const steps : number = 14

// Define the CarCharge component with StackScreenProps
const CarCharge: FC<StackScreenProps<NavigatorParamList, 'carCharge'>> = () => {
  // Redux state and animation ref
  const state = useSelector((state: CarDetailInterface) => state?.car);
  const animationProgress = useRef(new Animated.Value(state?.currentStep / steps)).current;
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
  const dispatch = useDispatch<AppDispatch>();
  const isMounted = useRef(true); // Initialize a ref to track the component's mounted state

  // Animation variables

  // Function to start the step animation
  useEffect(() => {
      stepAnimation()
      animateProgress();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [state?.currentStep]);

  const animateProgress = () => {
    if (!isMounted.current) {
      // Component is unmounted, exit the animation
      return;
  }}

  const stepAnimation = () => {

        Animated.timing(animationProgress, {
          toValue: state?.currentStep/steps,
          duration: state?.currentStep > 0.8*steps ? speed * 4 : speed,
          useNativeDriver: true,
        }).start(() => {
        setTimeout(() => {
          if(state?.currentStep < steps)
          {
            animationProgress.setValue(state?.currentStep/steps)
            dispatch(setChargeProgress(state?.currentStep + 1));
          }
           
        }, speed);
      })
  };

  console.log(state?.currentStep/steps )

  return (
    <SafeAreaView style={carDetailStyles.chargeScreen}>
      <FastImage
        style={carDetailStyles.image}
        source={{
          uri: state.carDetail?.imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}/>

      <View style={carDetailStyles.animationView}>
        {/* Conditional rendering of barShine not to show at the start and the end */}
        {state?.currentStep !== steps &&<LottieView
            style={carDetailStyles.barShine}
            source={require('../../app/assets/barShine.json')}
            autoPlay
            loop
          />}

        {/* Animated progress bars */}
        <AnimatedLottieView progress={animationProgress} style={carDetailStyles.barTop} source={require('../../app/assets/barTop.json')} />
        <AnimatedLottieView progress={animationProgress} style={carDetailStyles.barBody} source={require('../../app/assets/barBody.json')} />
        {state?.currentStep !== steps &&<LottieView style={{marginTop:-30 , height:30 , width:200}}  source={require("../../app/assets/barThunder.json")}/>}

        {/* Display charge details */}
        <View style={carDetailStyles.barDetail}>
       
        <Text>KW : {Math.floor(state?.currentStep/steps * state.carDetail?.externalParameters?.usable_battery_wh/1000)}</Text>
        <Text style={{fontWeight:'bold' , fontSize:18 ,color:'green'}}>
          {Math.floor(state?.currentStep/steps * 100)} %
        </Text>
        </View>
      </View>

      {/* Render details */}
      {renderDetail('Brand', state.carDetail?.brand)}
      {renderDetail('Speed', state.carDetail?.chargeSpeedInKw)}
      {renderDetail('Model', state.carDetail?.model)}
      {renderDetail('Version', state.carDetail?.version)}

    </SafeAreaView>
  );
};

export default CarCharge;
