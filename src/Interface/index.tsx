export type NavigatorParamList = {
  navigate(arg0: string): unknown;
  Car:undefined
  carDetail:undefined
  carList:undefined
  carCharge:undefined
}

export interface CarInfo {
  brand: string;
  category: string;
  id: number;
  imageUrl: string;
  model: string;
  version: string;
}

export interface CarDetailInterface {
  car: any;
  payload: any;
  autochargeCapable: boolean;
  brand: string;
  category: string;
  chargeCurve: string;
  chargeSpeedInKw: number;
  connectorType: string;
  externalParameters: {
    fast_chargers: string;
    ref_consumption: string;
    typecode: string;
    usable_battery_wh: string;
  };
  helpUrl: string;
  id: number;
  imageUrl: string;
  model: string;
  recommendedCharger: string;
  version: string;
}