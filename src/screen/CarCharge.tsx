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
let speed : number = 2000;
const steps : number = 30

// Define the CarCharge component with StackScreenProps
const CarCharge: FC<StackScreenProps<NavigatorParamList, 'carCharge'>> = () => {
  // Redux state and animation ref
  const state = useSelector((state: CarDetailInterface) => state?.car);
  const animationProgress: Animated.Value = useRef(new Animated.Value(state?.currentStep/steps)).current;
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
          duration: speed,
          useNativeDriver: true,
        }).start(() => {
        setTimeout(() => {
          if(state?.currentStep <= steps)
          {
            dispatch(setChargeProgress(state?.currentStep + 1));
            animationProgress.setValue(state?.currentStep/steps)
          }
        }, speed);
    })
  };

  // Function to handle the "Charge" button press
  const handleStartAnimation = () => {

    dispatch(setChargeProgress(0));
  };

  return (
    <SafeAreaView style={styles.containerScreen}>

      <FastImage
        style={carDetailStyles.image}
        source={{
          uri: state.carDetail?.imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}/>

      <View style={styles.container}>
        {/* Conditional rendering of barShine not to show at the start and the end */}
          <LottieView
            style={styles.barShine}
            source={require('../../app/assets/barShine.json')}
            autoPlay
            loop
          />

        {/* Animated progress bars */}
        <AnimatedLottieView progress={animationProgress} style={styles.barTop} source={require('../../app/assets/barTop.json')} />
        <AnimatedLottieView progress={animationProgress} style={styles.barBody} source={require('../../app/assets/barBody.json')} />
        <LottieView style={{marginTop:-30 , height:30 , width:200}}  source={require("../../app/assets/barThunder.json")}/>

        {/* Display charge details */}
        <View style={styles.barDetail}>
        <Text>{state.batteryCharge}</Text>
        {/* <Text style={{fontWeight:'bold' , fontSize:18 ,color:'green'}}>{Math.round((state.batteryCharge * state.carDetail?.chargeSpeedInKw) / steps)} %</Text> */}
          <Text>{state.carDetail?.chargeSpeedInKw} KWH</Text>
        </View>
      </View>

      {/* Render details */}
      {renderDetail('Brand', state.carDetail?.brand)}
      {renderDetail('Model', state.carDetail?.model)}
      {renderDetail('Version', state.carDetail?.version)}
      {renderDetail('Fast Charge', state.carDetail?.chargeSpeedInKw)}

    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  containerScreen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chargeButton: {
    width: '90%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
  },
  chargeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barTop: {
    marginBottom: -30,
    height: 30,
    width: 250,
  },
  barBody: {
    height: 30,
    width: 250,
  },
  barDetail: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:16,
  },
  barShine: {
    marginBottom: -30,
    zIndex: 1,
    height: 30,
    width: 250,
  },
});

export default CarCharge;
