import React from 'react';
import { StyleSheet } from "react-native";
  
export const carDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  helpButton: {
    marginLeft: '5%',
    backgroundColor: 'blue',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  helpButtonText: {
    color: 'white',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent:'space-between',
    width: '80%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'90%'
  },
  detailLabel: {
    fontSize: 12,
    color: 'gray',
  },
  detailValue: {
    fontSize: 14,
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
});